import DialyChecklist from "@/components/DailyChecklist";
import { SummaryDataType } from "@/interfaces/summary";
import { defaultChecklistData } from "@/lib/defaultData";
import { fetchChecklistData } from "@/app/actions/dailyChecklist";

const DailyChecklistWrapper = async ({ date }: { date: string }) => {
  //@ts-expect-error sdfsdf
  const data: SummaryDataType[] = await fetchChecklistData(date);

  return (
    <DialyChecklist
      initialData={
        data.length === 0 ? defaultChecklistData : data[0].checklistData
      }
    />
  );
};

export default DailyChecklistWrapper;
