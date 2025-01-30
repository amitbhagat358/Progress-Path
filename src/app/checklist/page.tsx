import DialyChecklist from "@/components/DailyChecklist";
import { fetchChecklistData } from "@/app/actions/checklist";
import { defaultChecklistData } from "@/lib/defaultData";

const ChecklistWrapper = async () => {
  const checklistData = await fetchChecklistData();

  return (
    <DialyChecklist
      initialData={
        checklistData.length !== 0 ? checklistData : defaultChecklistData
      }
    />
  );
};

export default ChecklistWrapper;
