"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { addTask, deleteTask, toggleTask } from "@/app/actions/taskActions";
import { format } from "date-fns";
import { DialogForEditing } from "./DialogForEditing";
import { useState } from "react";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { CalendForInput } from "./CalendarInput";
import { TasksType } from "@/interfaces/task";
import { Header } from "./Header";

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

  const handleDeleteTask = async (taskId: number) => {
    const tasksBeforeDelte = [...tasks];
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));

    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully 👍", {
        duration: 3000,
      });
    } catch (error) {
      setTasks(tasksBeforeDelte);
      toast.error("Error deleting task", {
        description: "Try refreshing the page",
        duration: 3000,
      });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setDeadline(date);
  };

  const [clicked, setClicked] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setClicked(id === clicked ? null : id);
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

        {/* Task Addition Form */}
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

        {/* Task List */}
        <div className="w-full md:w-[70%] m-auto py-3 border rounded-lg shadow-sm">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex flex-col justify-between items-center px-2 py-3 md:px-5 rounded-lg cursor-pointer select-none"
            >
              <div className="w-full flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={async () => {
                    await handleToggle(task.id);
                  }}
                />
                <div onClick={() => handleClick(task.id)}>
                  <p
                    className={`${
                      task.completed
                        ? "line-through dark:text-gray-200 light:text-gray-500"
                        : ""
                    }`}
                  >
                    {task.task}
                  </p>
                  <p className="text-sm text-gray-400">
                    {task?.deadline?.toString() && (
                      <span>
                        Deadline:{" "}
                        {format(new Date(task.deadline), "dd/MM/yyyy")}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="">
                {clicked == task.id && (
                  <div className="flex items-center gap-5 mt-4 mb-5">
                    <DialogForEditing
                      setTasks={setTasks}
                      task={task}
                      tasks={tasks}
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
