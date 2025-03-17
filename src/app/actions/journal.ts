"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromToken } from "@/lib/serverUtils";
import Journal from "@/schemas/Journal";
import Users from "@/schemas/UserSchema";
import { redirect } from "next/navigation";

export const addJournal = async (
  date: Date,
  content: string
): Promise<void> => {
  try {
    await connectToDatabase();
    const userId = await getUserIdFromToken();

    const journal = await Journal.findOneAndUpdate(
      { userId, date },
      { content },
      { upsert: true, new: true }
    );
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

export async function getMonthsWithEntries(
  year: number
): Promise<{ month: number; entryCount: number; previewImage?: string }[]> {
  // This is a placeholder implementation.
  // In a real application, this function would query your database
  // to find all months in the given year that have journal entries,
  // along with the count of entries for each month.

  // Example data (replace with actual data fetching logic)
  const monthsData = [];

  if (year === 2025) {
    monthsData.push({
      month: 1,
      entryCount: 3,
      previewImage: "/placeholder.jpg",
    });
    monthsData.push({
      month: 3,
      entryCount: 5,
      previewImage: "/placeholder.jpg",
    });
    monthsData.push({ month: 5, entryCount: 2 });
    monthsData.push({
      month: 10,
      entryCount: 7,
      previewImage: "/placeholder.jpg",
    });
  } else if (year === 2024) {
    monthsData.push({
      month: 11,
      entryCount: 4,
      previewImage: "/placeholder.jpg",
    });
    monthsData.push({
      month: 12,
      entryCount: 6,
      previewImage: "/placeholder.jpg",
    });
  }

  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return monthsData;
}
