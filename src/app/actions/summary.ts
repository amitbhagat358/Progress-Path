"use server";

import { redirect } from "next/navigation";

import {
  formatDateToStandard,
  formatDateToYYYYMMDD,
  isValidDateFormat,
} from "@/lib/utils";

import { connectToDatabase } from "@/lib/mongodb";
import Summary from "@/schemas/SummarySchema";
import { getUserIdFromToken } from "@/lib/serverUtils";
import { revalidatePath } from "next/cache";
import { SummaryDataType } from "@/interfaces/summary";
import { fetchChecklistData } from "./checklist";

export const fetchSummaryData = async (dateFromUrl: string) => {
  if (dateFromUrl === "today" || !isValidDateFormat(dateFromUrl)) {
    const dateInFormat = formatDateToYYYYMMDD(new Date());
    redirect(`/summary/${dateInFormat}`);
  }

  try {
    const date = new Date(dateFromUrl).toISOString();
    const userId = await getUserIdFromToken();

    await connectToDatabase();
    const summaries = await Summary.find({ userId, date })
      .lean()
      .select("-_id -__v -date -userId -checklistData")
      .exec();

    let checklistData = await fetchChecklistData(date);
    if (!checklistData) checklistData = [];

    const completeSummaryData = {
      ...summaries[0],
      checklistData: [...checklistData],
    };
    return completeSummaryData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const postSummaryData = async (
  dateFromUrl: string,
  data: SummaryDataType
) => {
  try {
    if (!isValidDateFormat(dateFromUrl)) {
      throw new Error("Invalid date format");
    }

    const date = new Date(dateFromUrl).toISOString();
    const userId = await getUserIdFromToken();

    await connectToDatabase();
    const summaryExists = await Summary.findOne({ userId, date });

    if (summaryExists) {
      await Summary.updateOne(
        { date, userId },
        {
          $set: {
            ...data,
            date,
            userId,
          },
        }
      );
      revalidatePath("/dashboard");
      return {
        message: `Summary updated for ${formatDateToStandard(dateFromUrl)}.`,
      };
    }

    const newSummary = new Summary({
      ...data,
      date,
      userId,
    });

    await newSummary.save();
    revalidatePath("/dashboard");
    return {
      message: `Summary saved for ${formatDateToStandard(dateFromUrl)}.`,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "An unexpected error occurred.",
    };
  }
};
