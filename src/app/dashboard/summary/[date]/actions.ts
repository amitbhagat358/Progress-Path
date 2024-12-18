'use server';

import { redirect } from 'next/navigation';
import { SummaryDataFromServer } from './interfaces';
import {
  formatDateToStandard,
  formatDateToYYYYMMDD,
  isValidDateFormat,
} from '@/lib/utils';

import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/sessions';

const SummarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  highlights: Array,
  learnings: Array,
  diaryContent: String,
  academicData: Array,
  codingData: Array,
  personalData: Array,
  date: {
    type: String,
    required: true,
  },
});

const Summary =
  mongoose.models.Summary || mongoose.model('Summary', SummarySchema);

export const fetchSummaryData = async (
  dateFromUrl: string
): Promise<SummaryDataFromServer[] | null> => {
  if (dateFromUrl !== 'today' && !isValidDateFormat(dateFromUrl)) {
    redirect(`/dashboard/summary/${formatDateToYYYYMMDD(new Date())}`);
  }

  try {
    if (dateFromUrl === 'today') {
      dateFromUrl = formatDateToYYYYMMDD(new Date());
    }

    const date = new Date(dateFromUrl).toISOString();

    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    const sessionData = session ? await decrypt(session) : null;
    const userId = sessionData?.userId;

    await connectToDatabase();
    const summaries = await Summary.find({ userId, date })
      .lean()
      .select('-_id -__v -date -userId')
      .exec();

    //@ts-expect-error handled type correctly
    return summaries;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const postSummaryData = async (
  dateFromUrl: string,
  data: SummaryDataFromServer
) => {
  try {
    if (dateFromUrl === 'today') {
      dateFromUrl = formatDateToYYYYMMDD(new Date());
    }

    if (!isValidDateFormat(dateFromUrl)) {
      throw new Error('Invalid date format');
    }

    const date = new Date(dateFromUrl).toISOString();

    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    const sessionData = session ? await decrypt(session) : null;
    const userId = sessionData?.userId;

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
    return {
      message: `Summary saved for ${formatDateToStandard(dateFromUrl)}.`,
    };
  } catch (error) {
    throw new Error('Server Error');
  }
};
