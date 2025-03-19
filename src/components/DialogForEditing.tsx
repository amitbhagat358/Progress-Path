import { editTask } from "@/app/actions/taskActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AutosizeTextarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";
import { Pencil } from "lucide-react";
import { CalendForInput } from "./CalendarInput";
import { toast } from "sonner";
import { TasksType } from "@/interfaces/task";

export function DialogForEditing({
  setTasks,
  task,
  tasks,
}: {
  setTasks: Dispatch<SetStateAction<TasksType[]>>;
  task: TasksType;
  tasks: TasksType[];
}) {
  const [taskName, setTaskName] = useState(task.task);
  const [deadline, setDeadline] = useState<Date | undefined>(
    task.deadline ? task.deadline : undefined
  );

  const handleEditTask = async () => {
    const tasksBeforeEdit = [...tasks];
    setTasks((tasks) =>
      tasks.map((t) =>
        t.id === task.id ? { ...t, task: taskName, deadline } : t
      )
    );

    try {
      await editTask(task.id, taskName, deadline);
    } catch (error) {
      setTasks(tasksBeforeEdit);
      toast.error("Error updating the task", {
        duration: 3000,
      });
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pencil />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[600px] h-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task
            </Label>
            <AutosizeTextarea
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
            <div className="col-span-3">
              <CalendForInput date={deadline} onDateChange={setDeadline} />
            </div>
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
