'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { addTask, deleteTask, toggleTask } from '@/app/actions/taskActions';
import { format } from 'date-fns';
import { DialogForEditing } from './DialogForEditing';
import { useState } from 'react';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import { CalendForInput } from './CalendarInput';
import { TasksType } from '@/interfaces/task';

const Tasks = ({ initialTasks }: { initialTasks: TasksType[] }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

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
      return;
    }
  };

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const task = formData.get('task') as string;

    //@ts-expect-error don't know
    if (deadline) formData.append('deadline', deadline);

    if (task === '') {
      toast.error('Task cannot be empty', {
        duration: 3000,
      });
      return;
    }

    const newTask = {
      id: Date.now(),
      task,
      completed: false,
      deadline: deadline ? new Date(deadline) : undefined,
    };

    const tasksBeforeAdd = [...tasks];
    setTasks((tasks) => [newTask, ...tasks]);

    try {
      await addTask(formData);
      toast.success('Task added successfully 👍', {
        duration: 3000,
      });
      form.reset();
      setDeadline(undefined);
    } catch (error) {
      toast.error('Error adding task', {
        description: 'Please try again.',
        duration: 3000,
      });
      setTasks(tasksBeforeAdd);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const tasksBeforeDelte = [...tasks];
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));

    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully 👍', {
        duration: 3000,
      });
    } catch (error) {
      setTasks(tasksBeforeDelte);
      toast.error('Error deleting task', {
        description: 'Try refreshing the page',
        duration: 3000,
      });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setDeadline(date);
  };

  return (
    <div className="p-4">
      <div className="w-full text-center text-3xl font-semibold mb-10">
        <span className="pb-0.5 border-b border-b-primary">
          What I have to do?
        </span>
      </div>

      {/* Task Addition Form */}
      <form onSubmit={handleAddTask} className="flex flex-col gap-2 mb-5">
        <div className="flex gap-5">
          <Input
            name="task"
            type="text"
            autoComplete="off"
            placeholder="Enter new task..."
            className="flex-2"
          />
          <div className="flex-1">
            <CalendForInput onDateChange={handleDateChange} date={deadline} />
          </div>
        </div>
        <Button
          type="submit"
          variant="outline"
          className="hover:bg-primary hover:text-background"
        >
          Add Task
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
              <DialogForEditing setTasks={setTasks} task={task} tasks={tasks} />
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
