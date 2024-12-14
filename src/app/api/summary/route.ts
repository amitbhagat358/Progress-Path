import { NextRequest, NextResponse } from 'next/server';
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

const isValidDateFormat = (dateStr: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) {
    return false;
  }
  const [year, month, day] = dateStr.split('-').map(Number);
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }
  const daysInMonth = new Date(year, month, 0).getDate();
  return day <= daysInMonth;
};

const formatDateToYYYYMMDD = (date: Date | undefined) => {
  if (!date) return '';
  const d = date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export async function GET(req: NextRequest) {
  await connectToDatabase();
  console.log('Database connected.');

  const searchParams = req.nextUrl.searchParams;
  const dateFromUrl = searchParams.get('date');

  let date;
  if (dateFromUrl && isValidDateFormat(dateFromUrl)) {
    date = new Date(dateFromUrl).toISOString();
  } else {
    date = formatDateToYYYYMMDD(new Date());
    return NextResponse.redirect(
      new URL(`/dashboard/summary?date=${date}`, req.nextUrl)
    );
  }

  try {
    const summaries = await Summary.find({ date });
    return NextResponse.json(summaries);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  console.log('Database connected.');

  const searchParams = req.nextUrl.searchParams;
  const dateFromUrl = searchParams.get('date');

  if (dateFromUrl === null) {
    return;
  }

  const date = new Date(dateFromUrl).toISOString();

  try {
    const body = await req.json();

    const summaryExists = await Summary.findOne({ date });

    if (summaryExists) {
      await Summary.updateOne(
        { date },
        {
          $set: {
            ...body,
            date,
          },
        }
      );
      return NextResponse.json({ message: 'Data updated successfully' });
    }

    const newSummary = new Summary({
      ...body,
      date,
    });

    await newSummary.save();
    return NextResponse.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
