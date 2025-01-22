'use server';
import { PurposeType } from '@/interfaces/purpose';
import { connectToDatabase } from '@/lib/mongodb';
import { getUserIdFromCookies } from '@/lib/serverUtils';
import Purpose from '@/schemas/Purpose';
import { revalidatePath } from 'next/cache';

export async function getPurposes() {
  try {
    const userId = await getUserIdFromCookies();

    await connectToDatabase();
    const data = await Purpose.findOne({ userId })
      .lean()
      .select('-_id -__v -userId')
      .exec();

    //@ts-expect-error don't know
    const purposesArray: PurposeType[] = data?.purposes || [];
    const finalData = purposesArray.map(({ id, text }) => ({ id, text }));

    return finalData;
  } catch (err) {
    console.error('Error fetching purposes:', err);
    return [];
  }
}

export async function updatePurpose(data: PurposeType[]) {
  try {
    const userId = await getUserIdFromCookies();

    await connectToDatabase();
    const updatedPurpose = await Purpose.findOneAndUpdate(
      { userId },
      { $set: { purposes: data } },
      { upsert: true, new: true }
    );
    revalidatePath('/purpose-of-study');
  } catch (err) {
    console.error('Error updating purposes: ', err);
    return null;
  }
}
