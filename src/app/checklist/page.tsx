import React from 'react';
import { fetchDailyChecklist } from '@/app/actions/dailyChecklist';
import DialyChecklist from '@/components/DailyChecklist';
import { DailyChecklistType } from '@/interfaces/checklist';

const DailyCheckListWrapper = async () => {
  //@ts-expect-error handled type correctly
  const daillyChecklist: DailyChecklistType[] | null =
    await fetchDailyChecklist();

  return (
    <DialyChecklist initialData={daillyChecklist ? daillyChecklist[0] : null} />
  );
};

export default DailyCheckListWrapper;
