import { editTask } from '@/app/actions/taskActions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dispatch, SetStateAction, useState } from 'react';
import { format } from 'date-fns';
import { Pencil } from 'lucide-react';

type TasksType = {
  id: number;
  task: string;
  completed: boolean;
  deadline: Date | null;
};

export function DialogForEditing({
  setTasks,
  task,
}: {
  setTasks: Dispatch<SetStateAction<TasksType[]>>;
  task: TasksType;
}) {
  const [taskName, setTaskName] = useState(task.task);
  const [deadline, setDeadline] = useState(
    task.deadline ? format(new Date(task?.deadline), 'dd/MM/yyyy') : ''
  );

  const handleEditTask = async () => {
    try {
      await editTask(task.id, taskName, deadline);
      const parsedDeadline = deadline ? new Date(deadline) : null;

      setTasks((tasks) =>
        tasks.map((t) =>
          t.id === task.id
            ? { ...t, task: taskName, deadline: parsedDeadline }
            : t
        )
      );
    } catch (error) {
      console.error('Failed to edit task', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-400"
        >
          <Pencil />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task
            </Label>
            <Input
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Deadline
            </Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleEditTask}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
