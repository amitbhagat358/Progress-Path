'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addTask } from '@/app/dashboard/taskActions';

type TasksType = {
  id: number;
  task: string;
  complted: boolean;
  deadline: Date;
};

const Tasks = ({ initialTasks }: { initialTasks: TasksType[] }) => {
  return (
    <div className="w-[50%] m-5 p-5 shadow-sm rounded-lg border border-[#e3e3e7]">
      <div className="w-full flex justify-center text-2xl font-semibold">
        Tasks
      </div>
      <form action={addTask}>
        <Input name="task" type="text" autoComplete="off" />
        <Button type="submit">Add task</Button>
      </form>

      {initialTasks?.map((task) => {
        return <div key={task.id}>{task.task}</div>;
      })}
    </div>
  );
};

export default Tasks;
