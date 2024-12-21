'use server';

import { connectToDatabase } from '@/lib/mongodb';
import { getUserIdFromCookies } from '@/lib/serverUtils';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
    required: false,
  },
});

const Tasks = mongoose.models.Tasks || mongoose.model('Tasks', TasksSchema);

export const fetchTasks = async () => {
  try {
    const userId = await getUserIdFromCookies();
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
    const userId = await getUserIdFromCookies();

    await connectToDatabase();

    const newTask = new Tasks({
      userId,
      id: Date.now(),
      task: formData.get('task') as string,
      completed: false,
      deadline: formData.get('deadline'),
    });

    await newTask.save();
    revalidatePath('/dashboard');
    return;
  } catch (error) {
    console.error('Error adding product:', error);
    return;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const userId = await getUserIdFromCookies();
    await connectToDatabase();
    await Tasks.deleteOne({ userId, id });
    // revalidatePath('/dashboard');
  } catch (err) {
    console.error('Error deleting task: ', err);
    throw new Error('Error deleting task: ');
  }
};

export const editTask = async (id: number, task: string, deadline?: string) => {
  try {
    const userId = await getUserIdFromCookies();
    await connectToDatabase();

    await Tasks.updateOne(
      { userId, id },
      {
        $set: {
          task,
          deadline,
        },
      }
    );
    revalidatePath('/dashboard');
  } catch (err) {
    console.error('Error editing task: ', err);
    return;
  }
};

export const toggleTask = async (id: number) => {
  try {
    const userId = await getUserIdFromCookies();
    await connectToDatabase();

    const task = await Tasks.findOne({ userId, id });
    await Tasks.updateOne(
      { userId, id },
      { $set: { completed: !task.completed } }
    );
    revalidatePath('/dashboard');
  } catch (err) {
    console.error('Error toggling task: ', err);
    return;
  }
};
