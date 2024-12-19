import ProfileIcon from '@/components/ProfileIcon';
import CalendarForSummary from './CalendarForSummary';
import TasksPage from './TasksPage';

const Dashbaord = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center p-5 border bg-white border-b-[#e3e3e7] sticky top-0">
        <div className="text-2xl font-bold w-1/4">Progress Path</div>
        <div className="w-3/4 flex justify-end mr-10 items-center gap-10">
          <ProfileIcon />
        </div>
      </div>
      <div className="flex">
        <TasksPage />
        <CalendarForSummary />
      </div>
    </div>
  );
};

export default Dashbaord;

export const dynamic = 'force-dynamic';
