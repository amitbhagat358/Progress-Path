export interface BulletPointType {
  id: number;
  text: string;
}

export interface CheckboxType {
  id: number;
  name: string;
  checked: boolean;
}

export interface ChecklistItemType {
  heading: string;
  checklist: CheckboxType[];
}

export interface ChecklistDataType {
  checklistData: ChecklistItemType[];
}

export interface SummaryDataType {
  highlights: BulletPointType[];
  learnings: BulletPointType[];
  diaryContent: string;
  checklistData: Array<ChecklistItemType>;
}

export interface userDataTypeForSidebar {
  name?: string;
  username?: string;
  email: string;
  avatar: string;
  image?: string;
}
