export interface BulletPointType {
  id: number;
  text: string;
}

export interface CheckboxType {
  id: number;
  name: string;
  checked: boolean;
}

export interface SummaryDataFromServer {
  highlights: BulletPointType[];
  learnings: BulletPointType[];
  codingData: CheckboxType[];
  academicData: CheckboxType[];
  personalData: CheckboxType[];
  diaryContent: string;
}

export interface userDataTypeForSidebar {
  username: string;
  email: string;
  avatar: string;
}
