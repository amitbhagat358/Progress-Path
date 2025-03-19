"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteTask, toggleTask } from "@/app/actions/taskActions";
import { format } from "date-fns";
import { DialogForEditing } from "@/components/DialogForEditing";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { TasksType } from "@/interfaces/task";

export default function TaskList({
  tasks,
  setTasks,
}: {
  tasks: TasksType[];
  setTasks: Dispatch<SetStateAction<TasksType[]>>;
}) {
  const [clicked, setClicked] = useState<number | null>(null);

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
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const tasksBeforeDelete = [...tasks];
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));

    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully 👍", { duration: 3000 });
    } catch (error) {
      setTasks(tasksBeforeDelete);
      toast.error("Error deleting task", {
        description: "Try refreshing the page",
        duration: 3000,
      });
    }
  };

  const handleClick = (id: number) => {
    setClicked(id === clicked ? null : id);
  };

  return (
    <div className="py-3 border rounded-lg shadow-sm empty:hidden">
      {tasks?.map((task) => (
        <div
          key={task.id}
          className="group flex flex-col justify-between px-2 py-3 md:mx-5 rounded-lg cursor-pointer select-none hover:bg-secondary"
        >
          <div
            className="flex items-center gap-3"
            onClick={() => handleClick(task.id)}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => handleToggle(task.id)}
            />
            <div>
              <p
                className={
                  task.completed
                    ? "line-through dark:text-gray-200 light:text-gray-500"
                    : ""
                }
              >
                {task.task}
              </p>
              <p className="text-sm text-gray-400">
                {task?.deadline && (
                  <span>
                    Deadline: {format(new Date(task.deadline), "dd/MM/yyyy")}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Actions */}
          {clicked === task.id && (
            <div className="flex justify-center md:justify-start md:ml-6 items-center gap-5 mt-4 mb-5">
              <DialogForEditing setTasks={setTasks} task={task} tasks={tasks} />
              <Button onClick={() => handleDeleteTask(task.id)}>
                <Trash />
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
