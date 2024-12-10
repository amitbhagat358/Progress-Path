import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define a schema and model
const SummarySchema = new mongoose.Schema({
  highlights: Array,
  academicData: Array,
  codingData: Array,
  personalData: Array,
  date: String,
});

const Summary =
  mongoose.models.Summary || mongoose.model('Summary', SummarySchema);

// Handle POST requests
export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { highlights, academicData, codingData, personalData, date } = body;

    const newSummary = new Summary({
      highlights,
      academicData,
      codingData,
      personalData,
      date,
    });
    await newSummary.save();

    return NextResponse.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

// Handle GET requests
export async function GET() {
  await connectToDatabase();

  try {
    const summaries = await Summary.find({});
    return NextResponse.json(summaries);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
