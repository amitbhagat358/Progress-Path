import ProfileIcon from '@/components/ProfileIcon';
import CalendarForSummary from './CalendarForSummary';
import TasksPage from './TaskPageWrapper';
import DailyCheckListWrapper from './DailyCheckListWrapper';
import { ModeToggle } from '@/components/ui/mode-toggle';

const Dashbaord = () => {
  return (
    <div className="w-full relative">
      <div className="w-full flex justify-between items-center mb-16 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  sticky top-0">
        <div className="text-2xl font-bold pl-20">Progress Path</div>
        <div className="flex justify-end pr-20 items-center gap-10">
          <ModeToggle />
          <ProfileIcon />
        </div>
      </div>
      <div className="w-full flex justify-center gap-20">
        <div className="w-[35%]">
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
