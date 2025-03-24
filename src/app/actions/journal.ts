"use server";

import { deleteFromCloudinary } from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/mongodb";
import { getAllImagesFromContent, getUserIdFromToken } from "@/lib/serverUtils";
import Journal from "@/schemas/Journal";
import Users from "@/schemas/UserSchema";
import { revalidatePath } from "next/cache";

export const addJournal = async (
  date: Date,
  content: string
): Promise<void> => {
  try {
    await connectToDatabase();
    const userId = await getUserIdFromToken();

    const journal = await Journal.findOne({ userId, date });
    if (!journal) {
      const newJournal = new Journal({ userId, date, content });
      await newJournal.save();
      return;
    }

    const previousImages = await getAllImagesFromContent(journal.content);
    const currentImages = await getAllImagesFromContent(content);

    for (const image of previousImages) {
      if (!currentImages.includes(image)) {
        await deleteFromCloudinary(image);
      }
    }

    const updatedJournal = await Journal.findOneAndUpdate(
      { userId, date },
      { content },
      { upsert: true, new: true }
    );
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    revalidatePath(`/journal/${year}/${month}`);
  } catch (error) {
    console.error("Error adding/updating journal:", error);
  }
};

export const getJournalByDate = async (date: Date): Promise<string> => {
  try {
    await connectToDatabase();
    const userId = await getUserIdFromToken();

    const journal = await Journal.findOne(
      { userId, date },
      { content: 1, _id: 0 }
    ).exec();

    if (!journal) {
      return "";
    }

    return journal.content;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const getJournalByMonth = async (
  year: number,
  month: number
): Promise<{ date: Date; content: string }[]> => {
  try {
    await connectToDatabase();
    const userId = await getUserIdFromToken();

    // Construct date range for the given month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const journals = await Journal.find(
      { userId, date: { $gte: startDate, $lte: endDate } },
      { date: 1, content: 1, _id: 0 }
    ).exec();

    return journals.map(({ date, content }) => ({
      date: new Date(date),
      content,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export async function getAvailableJournalYears(): Promise<number[]> {
  try {
    await connectToDatabase();
    console.log("Database connected successfully");

    const userId = await getUserIdFromToken();
    if (!userId) {
      throw new Error("User ID not found");
    }

    const user = await Users.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.createdAt) {
      throw new Error("User creation date is missing");
    }

    const joiningYear = new Date(user.createdAt).getFullYear();
    if (isNaN(joiningYear)) {
      throw new Error("Invalid joining year");
    }

    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - joiningYear + 1 },
      (_, i) => joiningYear + i
    );

    return years;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
}
