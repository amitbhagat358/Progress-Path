'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { getDate } from '@/lib/utils';
import AcademicData from './AcademicData';
import CodingData from './CodingData';

type AcademicDataType = {
  id: number;
  name: string;
  type: 'heading' | 'checkbox';
  childrens: AcademicDataType[];
  checked?: boolean;
};

type CodingDataType = AcademicDataType;

const AddSummaryPage = () => {
  const initialAcademicData: AcademicDataType[] = [
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

  const initialCodingData: CodingDataType[] = [
    {
      id: 2,
      name: 'Coding',
      type: 'heading',
      childrens: [
        {
          id: 3,
          name: 'Leetcode questions',
          type: 'checkbox',
          childrens: [],
          checked: false,
        },
      ],
    },
  ];

  const [academicDeta, setAcademicData] =
    useState<AcademicDataType[]>(initialAcademicData);
  const [codingData, setCodingData] =
    useState<AcademicDataType[]>(initialCodingData);
  const [note, setNote] = useState<string>('');

  return (
    <div className="w-full">
      <div className="w-full p-5 rounded-lg">
        <div className="font-semibold text-xl mb-5">{getDate()}</div>

        <div className="done flex gap-10 w-full px-2 py-5">
          <AcademicData
            academicData={academicDeta}
            setAcademicData={setAcademicData}
          />
          <CodingData codingData={codingData} setCodingData={setCodingData} />
          <div className="note w-[30%] border border-gray-300 shadow-sm rounded-lg p-6">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message-2" className="text-lg">
                Summary
              </Label>
              <Textarea
                id="message-2"
                value={note}
                placeholder="How was your day?"
                onChange={(e) => setNote(e.target.value)}
                className="h-[150px]"
              />
            </div>
          </div>
        </div>
        <div className="submit mt-4">
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AddSummaryPage;
