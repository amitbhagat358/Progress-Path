import CalendarForSummary from './CalendarForSummary';
import Tasks from './Tasks';

const TasksPage = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center p-5 border bg-white border-b-[#e3e3e7] sticky top-0">
        <div className="text-2xl font-bold w-1/4">Progress Path</div>
        <div className="w-3/4 flex justify-end items-center gap-10">
          <div>profile</div>
        </div>
      </div>
      <div className="flex">
        <Tasks />
        <CalendarForSummary />
      </div>
    </div>
  );
};

export default TasksPage;
