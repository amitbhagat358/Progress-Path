'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { addTask, deleteTask } from '@/app/dashboard/taskActions';
import { format } from 'date-fns';
import { DialogForEditing } from './DialogForEditing';

// Task type definition
type TasksType = {
  id: number;
  task: string;
  completed: boolean;
  deadline: Date;
};

const Tasks = ({ initialTasks }: { initialTasks: TasksType[] }) => {
  return (
    <div className="w-[50%] m-5 p-5 shadow-sm rounded-lg border border-[#e3e3e7]">
      <div className="w-full flex justify-center text-2xl font-semibold mb-4">
        Tasks
      </div>

      {/* Task Addition Form */}
      <form action={addTask} className="flex gap-2 mb-5">
        <Input
          name="task"
          type="text"
          autoComplete="off"
          placeholder="Enter new task"
          className="flex-1"
        />
        <Input name="deadline" type="date" className="flex-1" />
        <Button type="submit">Add Task</Button>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {initialTasks?.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center p-3 border rounded-lg hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <Checkbox checked={task.completed} />
              <div>
                <p
                  className={`font-medium ${
                    task.completed ? 'line-through text-gray-500' : ''
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
              <DialogForEditing task={task} />
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteTask(task.id)}
              >
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
