'use server';

import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
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

export const addProduct = async (formData: FormData) => {
  try {
    await connectToDatabase();
    console.log(formData.get('name'), '⭐⭐⭐');
    const newTask = new Tasks({
      id: Date.now(),
      name: formData.get('name') as string,
      completed: false,
      deadline: new Date(),
    });
    await newTask.save();
    return;
  } catch (error) {
    console.error('Error adding product:', error);
    return;
  }
};
