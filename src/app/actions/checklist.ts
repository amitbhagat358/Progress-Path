"use server";

import Summary from "@/schemas/SummarySchema";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromToken } from "@/lib/serverUtils";
import { hardcodedChecklistData } from "@/lib/hardcodedData";
import { unstable_cache, revalidateTag } from "next/cache";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import { ChecklistItemType } from "@/interfaces/summary";
import Users from "@/schemas/UserSchema";

export const fetchChecklistData = async (dateFromParent: string) => {
  try {
    const userId = await getUserIdFromToken();
    const date = new Date(dateFromParent).toISOString();

    const data = await cachedQuery(String(userId), String(date));
    return data;
  } catch (error) {
    console.error("Error fetching checklist:", error);
    return null;
  }
};

export const postChecklistData = async (data: ChecklistItemType[]) => {
  try {
    const userId = await getUserIdFromToken();
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
    revalidateTag("checklist-data");

    return { message: "Data saved successfully" };
  } catch (error) {
    console.error("Error saving data:", error);
    return { message: "An unexpected error occurred. Please try again." };
  }
};

export const postDefaultChecklistData = async (data: ChecklistItemType[]) => {
  try {
    const userId = await getUserIdFromToken();
    const rawDate = formatDateToYYYYMMDD(new Date());
    const date = new Date(rawDate).toISOString();

    await connectToDatabase();
    const defaultChecklistData = await Users.updateOne(
      { _id: userId },
      {
        defaultChecklistData: data,
      },
      { upsert: true }
    )
      .lean()
      .exec();

    await Summary.updateOne(
      { userId, date },
      { $set: { checklistData: data } }
    );

    revalidateTag("checklist-data");
    return defaultChecklistData;
  } catch (error) {
    console.log(error);
    console.log("error submitting the data");
  }
};

export const getDefaultChecklistDataForTheUser = async (userId: string) => {
  try {
    const data = await Users.findOne(
      { _id: userId },
      "defaultChecklistData -_id"
    )
      .lean()
      .exec();

    //@ts-expect-error if data exists, it will always have defaultChecklistData
    if (data.length !== 0) return data.defaultChecklistData;

    return null;
  } catch (error) {
    console.log("error submitting the data");
  }
};

const cachedQuery = unstable_cache(
  async (userId: string, date: string) => {
    await connectToDatabase();

    const result = await Summary.find(
      { userId, date },
      "checklistData -_id"
    )
      .lean()
      .exec()
      .catch((err) => {
        console.error("Error in Summary.find:", err);
        return [];
      });

    const dailyChecklist = Array.isArray(result) ? result : [];
    if (dailyChecklist.length > 0) return dailyChecklist[0].checklistData;

    const defaultData = await getDefaultChecklistDataForTheUser(userId);
    if (defaultData && defaultData.length > 0) return defaultData;

    return hardcodedChecklistData;
  },
  ["checklist-data"],
  { revalidate: 86400, tags: ["checklist-data"] }
);