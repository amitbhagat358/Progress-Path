'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  addTask,
  deleteTask,
  editTask,
  toggleTask,
} from '@/app/actions/taskActions';
import { format } from 'date-fns';
import { DialogForEditing } from './DialogForEditing';
import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Trash } from 'lucide-react';

// Task type definition
type TasksType = {
  id: number;
  task: string;
  completed: boolean;
  deadline: Date | null;
};

const Tasks = ({ initialTasks }: { initialTasks: TasksType[] }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleToggle = async (taskId: number) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      await toggleTask(taskId);
    } catch (error) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
      console.error('Failed to update task', error);
    }
  };

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const task = formData.get('task') as string;
    const deadline = formData.get('deadline') as string;

    const newTask = {
      id: Date.now(),
      task,
      completed: false,
      deadline: deadline ? new Date(deadline) : null,
    };

    setTasks((tasks) => [newTask, ...tasks]);
    await addTask(formData);
    form.reset();
  };

  const handleDeleteTask = async (taskId: number) => {
    const tasksBeforeDelte = [...tasks];
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));

    try {
      await deleteTask(taskId);
    } catch (error) {
      setTasks(tasksBeforeDelte);
      toast.error('Error deleting task', {
        description: 'Please try again later',
        duration: 3000,
      });
    }
  };

  return (
    <div className="p-4">
      <div className="w-full text-center text-3xl font-semibold mb-10">
        <span className="pb-0.5 border-b border-b-primary">
          What I have to do?
        </span>
      </div>

      {/* Task Addition Form */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-5">
        <Input
          name="task"
          type="text"
          autoComplete="off"
          placeholder="Enter new task"
          className="flex-2"
        />
        <Input name="deadline" type="date" className="flex-1" />
        <Button type="submit" variant="outline">
          <Plus />
        </Button>
      </form>

      {/* Task List */}
      <div className="py-3 border rounded-lg shadow-sm">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex justify-between items-center px-5 py-2 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={async () => {
                  await handleToggle(task.id);
                }}
              />
              <div>
                <p
                  className={`${
                    task.completed
                      ? 'line-through dark:text-gray-200 light:text-gray-500'
                      : ''
                  }`}
                >
                  {task.task}
                </p>
                <p className="text-sm text-gray-400">
                  {task?.deadline?.toString() && (
                    <span>
                      Deadline: {format(new Date(task.deadline), 'dd/MM/yyyy')}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <DialogForEditing setTasks={setTasks} task={task} />
              <Button
                variant="ghost"
                className="opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity duration-400"
                onClick={() => handleDeleteTask(task.id)}
              >
                <Trash />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
