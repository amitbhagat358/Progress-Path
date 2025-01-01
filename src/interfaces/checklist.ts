import { CheckboxType } from '@/app/dashboard/summary/[date]/interfaces';

interface DailyChecklistType {
  academicData: Array<CheckboxType>;
  codingData: Array<CheckboxType>;
  personalData: Array<CheckboxType>;
}

export type { DailyChecklistType };
