import CalendarForSummary from './CalendarForSummary';
import Tasks from './Tasks';

const AddSummaryButton = () => {
  return (
    <div className="flex">
      <Tasks />
      <CalendarForSummary />
    </div>
  );
};

export default AddSummaryButton;
