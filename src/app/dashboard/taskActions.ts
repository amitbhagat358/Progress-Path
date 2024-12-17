'use server';

import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

const TasksSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
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
    await connectToDatabase();
    const tasks = await Tasks.find({}).lean().select('-_id -__v').exec();
    return tasks;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const addTask = async (formData: FormData) => {
  try {
    await connectToDatabase();
    const newTask = new Tasks({
      id: Date.now(),
      task: formData.get('task') as string,
      completed: false,
      deadline: new Date(),
    });
    await newTask.save();
    revalidatePath('/dashboard');
    return;
  } catch (error) {
    console.error('Error adding product:', error);
    return;
  }
};
