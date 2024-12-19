import { fetchTasks } from '@/app/dashboard/taskActions';
import Tasks from '@/components/Tasks';

const TasksPage = async () => {
  const tasks = await fetchTasks();
  // @ts-expect-error handled
  return <Tasks initialTasks={tasks} />;
};

export default TasksPage;
