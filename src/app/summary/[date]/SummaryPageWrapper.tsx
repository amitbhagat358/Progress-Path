import SummaryPage from "./SummaryPage";
import { fetchSummaryData } from "@/app/actions/summary";
import { SummaryDataType } from "@/interfaces/summary";
import { defaultSummaryData } from "@/lib/hardcodedData";

const SummaryPageWrapper = async ({ date }: { date: string }) => {
  //@ts-expect-error sdfsdf
  const data: SummaryDataType[] = await fetchSummaryData(date);

  //@ts-expect-error handled
  return <SummaryPage date={date} initialData={data} />;
};

export default SummaryPageWrapper;
