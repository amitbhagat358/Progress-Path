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

const SummarySchema = new mongoose.Schema({
  highlights: Array,
  learnings: Array,
  diaryContent: String,
  academicData: Array,
  codingData: Array,
  personalData: Array,
  date: {
    type: String,
    required: true,
    unique: true,
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
    await connectToDatabase();
    if (dateFromUrl === 'today') {
      dateFromUrl = formatDateToYYYYMMDD(new Date());
    }
    const date = new Date(dateFromUrl).toISOString();
    const summaries = await Summary.find({ date })
      .lean()
      .select('-_id -__v -date')
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
    await connectToDatabase();

    if (dateFromUrl === 'today') {
      dateFromUrl = formatDateToYYYYMMDD(new Date());
    }

    if (!isValidDateFormat(dateFromUrl)) {
      throw new Error('Invalid date format');
    }

    const date = new Date(dateFromUrl).toISOString();
    const summaryExists = await Summary.findOne({ date });

    if (summaryExists) {
      await Summary.updateOne(
        { date },
        {
          $set: {
            ...data,
            date,
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
    });
    await newSummary.save();
    return {
      message: `Summary saved for ${formatDateToStandard(dateFromUrl)}.`,
    };
  } catch (error) {
    throw new Error('Server Error');
  }
};
