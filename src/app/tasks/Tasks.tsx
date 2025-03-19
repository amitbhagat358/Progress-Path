"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addTask } from "@/app/actions/taskActions";
import { useState } from "react";
import { toast } from "sonner";
import { CalendForInput } from "../../components/CalendarInput";
import { TasksType } from "@/interfaces/task";
import TaskList from "./task-list";

const Tasks = ({ initialTasks }: { initialTasks: TasksType[] }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const task = formData.get("task") as string;

    //@ts-expect-error don't know
    if (deadline) formData.append("deadline", deadline);

    if (task === "") {
      toast.error("Task cannot be empty", { duration: 3000 });
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
      toast.success("Task added successfully 👍", { duration: 3000 });
      form.reset();
      setDeadline(undefined);
    } catch (error) {
      toast.error("Error adding task", {
        description: "Please try again.",
        duration: 3000,
      });
      setTasks(tasksBeforeAdd);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setDeadline(date);
  };

  return (
    <div>
      <form
        onSubmit={handleAddTask}
        className="flex flex-col md:flex-row gap-2 mb-5 w-full"
      >
        <div className="flex-1">
          <Input
            name="task"
            type="text"
            autoComplete="off"
            placeholder="Enter new task..."
            className="w-full"
          />
        </div>

        <div className="flex gap-2 md:flex-shrink-0">
          <div className="flex-shrink-0">
            <CalendForInput onDateChange={handleDateChange} date={deadline} />
          </div>

          <Button
            type="submit"
            className="flex-shrink-0 hover:bg-primary hover:text-background"
          >
            Add Task
          </Button>
        </div>
      </form>

      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Tasks;
