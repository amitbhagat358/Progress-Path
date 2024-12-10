'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { getDate } from '@/lib/utils';
import AcademicData from './AcademicData';
import CodingData from './CodingData';
import PersonalData from './PersonalData';
import Hightlights from './Highlights';
import { useHighlights } from './context/HighlightsContext';

type HeadingCheckboxType = {
  id: number;
  name: string;
  type: 'heading' | 'checkbox';
  childrens: HeadingCheckboxType[];
  checked?: boolean;
};

const AddSummaryPage = () => {
  const initialAcademicData: HeadingCheckboxType[] = [
    {
      id: 0,
      name: 'Academics',
      type: 'heading',
      childrens: [
        {
          id: 1,
          name: 'Class Revision',
          type: 'checkbox',
          childrens: [],
          checked: false,
        },
      ],
    },
  ];

  const initialCodingData: HeadingCheckboxType[] = [
    {
      id: 2,
      name: 'Coding',
      type: 'heading',
      childrens: [
        {
          id: 3,
          name: 'Leetcode',
          type: 'checkbox',
          childrens: [],
          checked: false,
        },
        {
          id: 100,
          name: 'Codeforces',
          type: 'checkbox',
          childrens: [],
          checked: false,
        },
        {
          id: 101,
          name: 'Web Development',
          type: 'checkbox',
          childrens: [],
          checked: false,
        },
      ],
    },
  ];

  const initialPersonalData: HeadingCheckboxType[] = [
    {
      id: 4,
      name: 'Personal',
      type: 'heading',
      childrens: [
        {
          id: 5,
          name: 'Book reading',
          type: 'checkbox',
          childrens: [],
          checked: false,
        },
      ],
    },
  ];

  const [academicDeta, setAcademicData] =
    useState<HeadingCheckboxType[]>(initialAcademicData);
  const [codingData, setCodingData] =
    useState<HeadingCheckboxType[]>(initialCodingData);
  const [personalData, setPersonalData] =
    useState<HeadingCheckboxType[]>(initialPersonalData);

  return (
    <div className="w-full">
      <div className="font-semibold text-xl p-5">{getDate()}</div>
      <div className="w-full flex justify-between p-5 rounded-lg">
        <div className="done min-h-[300px] flex flex-col gap-5 w-[30%]">
          <AcademicData
            academicData={academicDeta}
            setAcademicData={setAcademicData}
          />
          <CodingData codingData={codingData} setCodingData={setCodingData} />
          <PersonalData
            personalData={personalData}
            setPersonalData={setPersonalData}
          />
        </div>
        <div className="note w-[60%]">
          <div className="w-full">
            <Hightlights heading={'Highlights of the day'} />
          </div>
        </div>
      </div>
      <div className="submit mt-4">
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default AddSummaryPage;
