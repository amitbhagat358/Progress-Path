'use server';

import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const TasksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
});

const Tasks = mongoose.models.Tasks || mongoose.model('Tasks', TasksSchema);

export const fetchTasks = async () => {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    await connectToDatabase();
    const tasks = await Tasks.find({ userId })
      .lean()
      .select('-_id -__v -userId')
      .exec();
    return tasks;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const addTask = async (formData: FormData) => {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    console.log(userId, 'userId');

    await connectToDatabase();
    const newTask = new Tasks({
      userId,
      id: Date.now(),
      task: formData.get('task') as string,
      completed: false,
      deadline: new Date(),
    });
    console.log(newTask);

    await newTask.save();
    revalidatePath('/dashboard');
    return;
  } catch (error) {
    console.error('Error adding product:', error);
    return;
  }
};
