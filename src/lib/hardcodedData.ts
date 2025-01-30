import { SummaryDataType } from "@/interfaces/summary";

export const hardcodedChecklistData = [
  {
    heading: "Academics",
    checklist: [{ id: 0, name: "class revision", checked: false }],
  },
  {
    heading: "Coding",
    checklist: [
      { id: 1, name: "codeforces questions", checked: false },
      { id: 2, name: "leetcode questions", checked: false },
      { id: 3, name: "web development", checked: false },
      { id: 4, name: "system design", checked: false },
    ],
  },
  {
    heading: "Personal",
    checklist: [
      { id: 1, name: "book reading", checked: false },
      { id: 2, name: "communication improvement", checked: false },
    ],
  },
];

export const defaultSummaryData: SummaryDataType = {
  highlights: [],
  learnings: [],
  diaryContent: "",
  checklistData: hardcodedChecklistData,
};
