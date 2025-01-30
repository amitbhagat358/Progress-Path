"use server";

import Summary from "@/schemas/SummarySchema";
import { ChecklistItemType } from "@/interfaces/summary";
import { connectToDatabase } from "@/lib/mongodb";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import { getUserIdFromCookies } from "@/lib/serverUtils";
import Users from "@/schemas/UserSchema";

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

    // data will be in form of array
    if (dailyChecklist.length !== 0) return dailyChecklist[0].checklistData;

    // if no data for that day then send the default checklist
    // and if the default checklist is not there for the user, it will send the one hardcoded in a seperate file
    const data = await getDefaultChecklistData();
    return data;
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

export const getDefaultChecklistData = async () => {
  try {
    const userId = await getUserIdFromCookies();

    await connectToDatabase();
    const data = await Users.findOne(
      { _id: userId },
      "defaultChecklistData -_id"
    )
      .lean()
      .exec();

    //@ts-expect-error if data exists, it will always have defaultChecklistData
    if (data) return data.defaultChecklistData;

    return null;
  } catch (error) {
    console.log("error submitting the data");
  }
};

export const postDefaultChecklistData = async (data: ChecklistItemType[]) => {
  try {
    const userId = await getUserIdFromCookies();

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

    return defaultChecklistData;
  } catch (error) {
    console.log(error);
    console.log("error submitting the data");
  }
};
