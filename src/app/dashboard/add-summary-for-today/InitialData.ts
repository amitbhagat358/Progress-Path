interface Checkbox {
  id: number;
  name: string;
  checked: boolean;
}

export const initial_academic_data: Checkbox[] = [
  {
    id: 0,
    name: 'Class Revision',
    checked: false,
  },
];

export const initial_coding_data: Checkbox[] = [
  {
    id: 0,
    name: 'Leetcode Questions',
    checked: false,
  },
  {
    id: 1,
    name: 'Codeforces Questions',
    checked: false,
  },
  {
    id: 2,
    name: 'Web Dev',
    checked: false,
  },
];

export const initial_personal_data: Checkbox[] = [
  {
    id: 0,
    name: 'Book reading',
    checked: false,
  },
];
