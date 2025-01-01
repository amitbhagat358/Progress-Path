'use server';

import { DailyChecklistType } from '@/interfaces/checklist';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserIdFromCookies } from '@/lib/serverUtils';
import { formatDateToYYYYMMDD } from '@/lib/utils';
import Summary from '@/schemas/SummarySchema';

const fetchDailyChecklist = async () => {
  try {
    const userId = await getUserIdFromCookies();
    const rawDate = formatDateToYYYYMMDD(new Date());
    const date = new Date(rawDate).toISOString();

    await connectToDatabase();
    const dailyChecklist = await Summary.find(
      { userId, date },
      'academicData codingData personalData -_id'
    )
      .lean()
      .exec();

    return dailyChecklist;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const postDailyChecklist = async (data: DailyChecklistType) => {
  try {
    const userId = await getUserIdFromCookies();
    const rawDate = formatDateToYYYYMMDD(new Date());
    const date = new Date(rawDate).toISOString();

    await connectToDatabase();
    await Summary.updateOne(
      { userId, date },
      {
        academicData: data.academicData,
        codingData: data.codingData,
        personalData: data.personalData,
      },
      { upsert: true }
    ).exec();
    return { message: 'Data saved successfully' };
  } catch (error) {
    console.error('Error saving data:', error);
    return { message: 'An unexpected error occurred. Please try again.' };
  }
};

export { fetchDailyChecklist, postDailyChecklist };
