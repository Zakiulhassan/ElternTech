"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { user } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./emails";
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";



const action = createSafeActionClient();

export const emailSignin = action(
  LoginSchema,
  async ({ email, password, code }) => {
    try{    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: "Email not Found" };
    }
    if (!existingUser.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(existingUser.email)
      await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)
      return {Success: "Confirmation email sent"}
    }
// 2FA
    await signIn("credentials", {
      email, password, redirectTo: "/"
    })
    return { Success: "User signed in!" };}
    catch(error){
      console.log(error)
      if(error instanceof AuthError ) {
        switch(error.type) {
          case 'CredentialsSignin':
            return {error: 'Incorrect email or password!'}
          case 'AccessDenied':
            return {error: error.message}
          case 'OAuthSignInError':
            return {error: error.message}
            default: return{error: "Something went wrong"}
        }
      }
      throw error
    }

  }
);
