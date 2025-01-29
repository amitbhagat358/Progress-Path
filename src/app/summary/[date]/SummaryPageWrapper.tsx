import SummaryPage from "@/components/SummaryPage";
import { fetchSummaryData } from "@/app/actions/summary";
import { SummaryDataType } from "@/interfaces/summary";
import { defaultSummaryData } from "@/lib/defaultData";

const SummaryPageWrapper = async ({ date }: { date: string }) => {
  //@ts-expect-error sdfsdf
  const data: SummaryDataType[] = await fetchSummaryData(date);

  return (
    <SummaryPage
      date={date}
      initialData={data.length === 0 ? defaultSummaryData : data[0]}
    />
  );
};

export default SummaryPageWrapper;
