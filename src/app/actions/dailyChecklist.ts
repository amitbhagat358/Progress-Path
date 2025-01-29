"use server";

import Summary from "@/schemas/SummarySchema";
import { ChecklistItemType } from "@/interfaces/summary";
import { connectToDatabase } from "@/lib/mongodb";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import { getUserIdFromCookies } from "@/lib/serverUtils";

export const fetchChecklistData = async () => {
  try {
    const userId = await getUserIdFromCookies();
    const rawDate = formatDateToYYYYMMDD(new Date());
    const date = new Date(rawDate).toISOString();

    await connectToDatabase();
    const dailyChecklist = await Summary.find(
      { userId, date },
      "checklistData -_id"
    )
      .lean()
      .exec();

    return dailyChecklist;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const postChecklistData = async (data: ChecklistItemType[]) => {
  try {
    const userId = await getUserIdFromCookies();
    const rawDate = formatDateToYYYYMMDD(new Date());
    const date = new Date(rawDate).toISOString();

    await connectToDatabase();
    await Summary.updateOne(
      { userId, date },
      {
        checklistData: data,
      },
      { upsert: true }
    ).exec();
    return { message: "Data saved successfully" };
  } catch (error) {
    console.error("Error saving data:", error);
    return { message: "An unexpected error occurred. Please try again." };
  }
};
