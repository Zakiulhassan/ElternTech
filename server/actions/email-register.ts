"use server";

import { createSafeActionClient } from "next-safe-action";
import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";

import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./emails";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, password, name }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
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

    await db.insert(users).values({
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
