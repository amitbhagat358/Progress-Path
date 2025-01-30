import { fetchChecklistData } from "@/app/actions/checklist";
import { defaultChecklistData } from "@/lib/defaultData";
import EditChecklist from "./Edit";

const ChecklistWrapper = async () => {
  const checklistData = await fetchChecklistData();
  console.log("checklistData", checklistData);

  return (
    <EditChecklist
      initialData={
        checklistData.length !== 0 ? checklistData : defaultChecklistData
      }
    />
  );
};

export default ChecklistWrapper;
