"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addTask } from "@/app/actions/taskActions";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendForInput } from "./CalendarInput";
import { TasksType } from "@/interfaces/task";
import { Header } from "./Header";
import TaskList from "./task-list";

const Tasks = ({ initialTasks }: { initialTasks: TasksType[] }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const task = formData.get("task") as string;

    //@ts-expect-error don't know
    if (deadline) formData.append("deadline", deadline);

    if (task === "") {
      toast.error("Task cannot be empty", {
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
      toast.success("Task added successfully 👍", {
        duration: 3000,
      });
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
    <div className="w-full">
      <Header />
      <div className="w-full p-5">
        <div className="w-full m-auto md:text-center text-3xl font-semibold mb-10">
          <span className="underline underline-offset-8 decoration-1 decoration-primary">
            What I have to do?
          </span>
        </div>

        <form
          onSubmit={handleAddTask}
          className="w-full md:w-[70%] m-auto flex flex-col gap-2 mb-5"
        >
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

        <Suspense fallback={<div>Loading Tasks</div>}>
          <TaskList tasks={tasks} setTasks={setTasks} />
        </Suspense>
      </div>
    </div>
  );
};

export default Tasks;
