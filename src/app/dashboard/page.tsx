import CalendarForSummary from './CalendarForSummary';
import TasksPage from './TaskPageWrapper';
import DailyCheckListWrapper from './DailyCheckListWrapper';
import { Header } from '@/components/Header';

const Dashbaord = () => {
  return (
    <div className="w-full relative">
      <Header />
      <div className="w-full flex justify-center gap-10">
        <div className="w-[35%]">
          <DailyCheckListWrapper />
        </div>
        <div className="w-[60%] flex flex-col">
          <TasksPage />
        </div>
      </div>
    </div>
  );
};

export default Dashbaord;

export const dynamic = 'force-dynamic';
