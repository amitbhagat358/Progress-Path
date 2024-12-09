'use server';
import { SignJWT } from 'jose';

export const createToken = async (userId: unknown) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  const encoder = new TextEncoder();
  const jwtSecret = encoder.encode(secret);

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(jwtSecret);

  return token;
};
