import ProfileIcon from '@/components/ProfileIcon';
import CalendarForSummary from './CalendarForSummary';
import TasksPage from './TasksPage';
import DailyCheckListWrapper from './DailyCheckListWrapper';

const Dashbaord = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center p-5 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-[#e3e3e7] sticky top-0">
        <div className="text-2xl font-bold w-1/4">Progress Path</div>
        <div className="w-3/4 flex justify-end mr-10 items-center gap-10">
          <ProfileIcon />
        </div>
      </div>
      <div className="w-full flex gap-20">
        <div className="w-[30%]">
          <DailyCheckListWrapper />
        </div>
        <div className="w-[50%] flex flex-col">
          <TasksPage />
          <CalendarForSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashbaord;

export const dynamic = 'force-dynamic';
