import SummaryPage from './SummaryPage';
import { fetchSummaryData } from './actions';
import { SummaryDataFromServer } from './interfaces';

const SummaryPageWrapper = async ({ date }: { date: string }) => {
  const data: SummaryDataFromServer[] | null = await fetchSummaryData(date);

  return <SummaryPage date={date} initialData={data ? data[0] : null} />;
};

export default SummaryPageWrapper;
