"use server";

import { createSafeActionClient } from "next-safe-action";
import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";

import { db } from "..";
import { eq } from "drizzle-orm";
import { user } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./emails";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, password, name }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );

        return { success: "Email confirmation resent" };
      }
      return { error: "Email already exists." };
    }

    await db.insert(user).values({
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
    });

    const verificationToken = await generateEmailVerificationToken(email);
    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token
    );
    return { success: "Email confirmation sent" };
  }
);