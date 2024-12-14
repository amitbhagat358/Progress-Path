import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { isValidDateFormat } from '@/lib/utils';

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

export async function GET(req: NextRequest) {
  await connectToDatabase();
  console.log('Database connected.');

  const searchParams = req.nextUrl.searchParams;
  const dateFromUrl = searchParams.get('date');

  if (!isValidDateFormat(dateFromUrl)) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
  }

  //@ts-expect-error handled in isValidDateFormat
  const date = new Date(dateFromUrl).toISOString();
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

  if (!isValidDateFormat(dateFromUrl)) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
  }

  //@ts-expect-error handled in isValidDateFormat
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
