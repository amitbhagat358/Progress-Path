import ProfileIcon from '@/components/ProfileIcon';
import CalendarForSummary from './CalendarForSummary';
import TasksPage from './TaskPageWrapper';
import DailyCheckListWrapper from './DailyCheckListWrapper';
import { ModeToggle } from '@/components/ui/mode-toggle';

const Dashbaord = () => {
  return (
    <div className="w-full relative">
      <div className="w-full flex justify-center items-center p-3 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0">
        <div className="text-2xl font-bold w-1/4">Progress Path</div>
        <div className="w-3/4 flex justify-end mr-10 items-center gap-10">
          <ModeToggle />
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
