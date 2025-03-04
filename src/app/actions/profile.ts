"use server-only";

import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromToken } from "@/lib/serverUtils";
import Users from "@/schemas/UserSchema";

export const getUserDetails = async () => {
  const userId = await getUserIdFromToken();

  try {
    connectToDatabase();
    const userDetails = await Users.findOne({ _id: userId })
      .lean()
      .select("-_id -__v -password")
      .exec();
    return userDetails;
  } catch (error) {
    return;
  }
};

// export const updateProfile = async ({ data }) => {};
