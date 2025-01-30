import { fetchChecklistData } from "@/app/actions/checklist";
import EditChecklist from "./Edit";
import { formatDateToYYYYMMDD } from "@/lib/utils";

const ChecklistWrapper = async () => {
  const rawDate = formatDateToYYYYMMDD(new Date());
  const date = new Date(rawDate).toISOString();
  const checklistData = await fetchChecklistData(date);

  return <EditChecklist initialData={checklistData} />;
};

export default ChecklistWrapper;
