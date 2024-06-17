"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailTokens, user } from "../schema";

const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.emailTokens.findFirst({
      where: eq(emailTokens.email, email),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

// New function to get token by the token value
const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.query.emailTokens.findFirst({
      where: eq(emailTokens.token, token),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.token, existingToken.token));
  }

  const verificationToken = await db
    .insert(emailTokens)
    .values({ email, token, expires })
    .returning();

  return verificationToken;
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token); // Change here
  if (!existingToken) return { error: "Token not found" };
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, existingToken.email),
  });

  if (!existingUser) return { error: "Email does not exist" };

  await db.update(user).set({
    emailVerified: new Date(),
    email: existingToken.email,
  }).where(eq(user.email, existingToken.email)); // Add where clause

  await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  return { success: "Email Verified" };
};
