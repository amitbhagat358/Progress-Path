'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getDate } from '@/lib/utils';
import AcademicData from './AcademicData';
import CodingData from './CodingData';
import PersonalData from './PersonalData';
import Hightlights from './Highlights';
import { useHighlights } from './context/HighlightsContext';

const AddSummaryPage = () => {
  return (
    <div className="w-full">
      <div className="font-semibold text-xl p-5">{getDate()}</div>
      <div className="w-full flex justify-between p-5 rounded-lg">
        <div className="done min-h-[300px] flex flex-col gap-5 w-[30%]">
          <AcademicData heading="Academics" />
          <CodingData heading="Coding" />
          <PersonalData heading="Personal" />
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
