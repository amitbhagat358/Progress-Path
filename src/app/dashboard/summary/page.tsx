'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import AcademicData from './AcademicData';
import CodingData from './CodingData';
import PersonalData from './PersonalData';
import Hightlights from './Highlights';
import Learnings from './Learnings';
import { useHighlights } from './context/HighlightsContext';
import { useAcademicData } from './context/AcademicDataContext';
import { useCodingData } from './context/CodingDataContext';
import { usePersonalData } from './context/PersonalDataContext';
import { useLearnings } from './context/LearningsContext';

import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Diary from './Diary';
import { useDiary } from './context/DiaryContext';

const AddSummaryPage = () => {
  const searchParams = useSearchParams();
  const date: string | null = searchParams.get('date');

  const { highlights, setHighlights } = useHighlights();
  const { learnings, setLearnings } = useLearnings();
  const { diaryContent, setDiaryContent } = useDiary();
  const { items: AcademicDataItems, setItems: setAcademicDataItems } =
    useAcademicData();
  const { items: CodingDataItems, setItems: setCodingDataItems } =
    useCodingData();
  const { items: PersonalDataItems, setItems: setPersonalDataItems } =
    usePersonalData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/summary?date=${date}`);

        if (res.redirected) {
          window.location.href = res.url;
          return;
        }

        const data = await res.json();
        console.log(data);
        if (data.length > 0) {
          const latest = data[data.length - 1];
          setHighlights(latest.highlights);
          setLearnings(latest.learnings);
          setDiaryContent(latest.diaryContent);
          setAcademicDataItems(latest.academicData);
          setCodingDataItems(latest.codingData);
          setPersonalDataItems(latest.personalData);
        }
      } catch (error) {
        toast.error(`Error fetching the data for ${formatDate(date)}.`, {
          description: 'Please try again later.',
          duration: 3000,
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleSubmit = async () => {
    const data = {
      highlights,
      learnings,
      diaryContent,
      academicData: AcademicDataItems,
      codingData: CodingDataItems,
      personalData: PersonalDataItems,
    };

    console.log('🙏', data);

    try {
      const res = await fetch(`/api/summary?date=${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to save data');
      }

      const resData = await res.json();
      toast.success(`${resData.message} for ${formatDate(date)}`, {
        duration: 3000,
      });
    } catch (error) {
      toast.error(`Error Saving the data for ${formatDate(date)}.`, {
        description: `Please try again later.`,
        duration: 3000,
      });
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center p-5 border bg-white border-b-[#e3e3e7] sticky top-0">
        <div className="text-2xl font-bold w-1/4">Progress Path</div>
        <div className="w-1/2 flex justify-center items-center">
          {formatDate(date)}
        </div>
        <div className="w-1/4 flex justify-end ">profile</div>
      </div>
      <div className="w-full border-b border-b-[#e3e3e7]">
        <div className="w-full flex rounded-lg">
          <div className="done w-[25%] min-h-[300px] flex flex-col justify-between gap-5 p-5 border-r border-r-[#e3e3e7]">
            <AcademicData heading="Academics" />
            <CodingData heading="Coding" />
            <PersonalData heading="Personal" />
          </div>
          <div className="w-[40%] p-5">
            <div className="w-full h-full flex flex-col justify-between gap-5">
              <Hightlights heading={'Highlights of the day'} />
              <Learnings heading={'Learnings of the day'} />
            </div>
          </div>
          <div className="w-[35%] p-5">
            <Diary />
          </div>
        </div>
      </div>
      <div className="submit mt-4 flex justify-center items-center">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default AddSummaryPage;
