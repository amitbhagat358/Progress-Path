import DialyChecklist from "@/components/DailyChecklist";
import { fetchChecklistData } from "@/app/actions/checklist";
import { formatDateToYYYYMMDD } from "@/lib/utils";

const ChecklistWrapper = async () => {
  const rawDate = formatDateToYYYYMMDD(new Date());
  const date = new Date(rawDate).toISOString();
  const checklistData = await fetchChecklistData(date);

  return <DialyChecklist initialData={checklistData} />;
};

export default ChecklistWrapper;
