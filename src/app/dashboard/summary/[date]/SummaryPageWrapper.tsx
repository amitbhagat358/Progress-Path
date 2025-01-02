import SummaryPage from '../../../../components/SummaryPage';
import { fetchSummaryData } from '@/app/actions/summary';
import { SummaryDataFromServer } from '@/interfaces/summary';

const SummaryPageWrapper = async ({ date }: { date: string }) => {
  const data: SummaryDataFromServer[] | null = await fetchSummaryData(date);

  return <SummaryPage date={date} initialData={data ? data[0] : null} />;
};

export default SummaryPageWrapper;
