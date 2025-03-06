import { fetchTasks } from "@/app/actions/taskActions";
import Tasks from "@/app/tasks/Tasks";

const TaskPageWrapper = async () => {
  const tasks = await fetchTasks();
  //@ts-expect-error handled
  return <Tasks initialTasks={tasks} />;
};

export default TaskPageWrapper;
