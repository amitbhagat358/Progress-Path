import { Input } from '@/components/ui/input';
import { fetchTasks, addProduct } from './taskActions';
import { Button } from '@/components/ui/button';

interface TaskType {
  id: number;
  name: string;
  completed: boolean;
  deadline: Date;
}

const Tasks = async () => {
  const tasks = await fetchTasks();

  return (
    <div className="w-[50%] m-5 p-5 shadow-sm rounded-lg border border-[#e3e3e7]">
      <div className="w-full flex justify-center text-2xl font-semibold ">
        Tasks
      </div>
      <form action={addProduct}>
        <Input name="name" type="text"></Input>
        <Button type="submit">Add task</Button>
      </form>

      {tasks?.map((task) => {
        return <div key={task.id}>{task.name}</div>;
      })}
    </div>
  );
};

export default Tasks;
