import { fetchTasks } from "@/app/actions/taskActions";
import Tasks from "@/app/tasks/Tasks";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";

const TaskSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex flex-col md:flex-row gap-5 mb-5 animate-pulse">
        <div className="flex-1 bg-muted rounded-lg">
          <div className="h-10 rounded"></div>
        </div>
        <div className="flex gap-2 md:flex-shrink-0">
          <div className="flex-shrink-0 bg-muted rounded-lg w-44 h-10"></div>
          <div className="flex-shrink-0 bg-muted rounded-lg w-24 h-10"></div>
        </div>
      </div>
      <div className="rounded-lg flex flex-col gap-3 p-4 border">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-1 p-3 rounded-lg shadow-sm"
          >
            <div className="w-10 h-10 bg-muted rounded-lg"></div>
            <div className="w-full h-10 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TaskPageWrapper = async () => {
  const tasks = await fetchTasks();
  //@ts-expect-error handled
  return <Tasks initialTasks={tasks} />;
};

const TaskPage = () => {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
      <div className="p-5">
        <div className="m-auto md:text-center text-3xl font-semibold mb-10">
          <div className="flex justify-between items-center md:justify-center">
            <span className="underline underline-offset-8 decoration-1 decoration-primary">
              What I have to do?
            </span>
            <SidebarTrigger className="md:hidden" />
          </div>
        </div>
        <Suspense fallback={<TaskSkeleton />}>
          <TaskPageWrapper />
        </Suspense>
      </div>
    </div>
  );
};

export default TaskPage;
