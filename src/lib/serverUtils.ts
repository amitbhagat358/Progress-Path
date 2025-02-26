"use server";

import { cookies } from "next/headers";
import { decrypt } from "./sessions";
import { connectToDatabase } from "./mongodb";
import Users from "@/schemas/UserSchema";
import { userDataTypeForSidebar } from "@/interfaces/summary";

export const getUserIdFromCookies = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const sessionData = session ? await decrypt(session) : null;
  const userId = sessionData?.userId;
  //@ts-expect-error userId will always be a string or null
  return userId;
};

export const getUserData = async (): Promise<userDataTypeForSidebar | null> => {
  try {
    connectToDatabase();
    const userId = await getUserIdFromCookies();
    if (!userId) return null;

    const user = await Users.findOne({ _id: userId });
    return {
      username: user.username,
      email: user.email,
      avatar: user.username[0].toUpperCase(),
    };
  } catch (error) {
    return null;
  }
};
