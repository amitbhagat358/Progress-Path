"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromToken } from "@/lib/serverUtils";
import Journal from "@/schemas/Journal";
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
