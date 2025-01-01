'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  formatDateToStandard,
  formatDateToYYYYMMDD,
  isValidDateFormat,
} from '@/lib/utils';

import AcademicData from './AcademicData';
import CodingData from './CodingData';
import PersonalData from './PersonalData';
import Hightlights from './Highlights';
import Learnings from './Learnings';
import Diary from './Diary';

import { useHighlights } from './context/HighlightsContext';
import { useAcademicData } from './context/AcademicDataContext';
import { useCodingData } from './context/CodingDataContext';
import { usePersonalData } from './context/PersonalDataContext';
import { useLearnings } from './context/LearningsContext';
import { useDiary } from './context/DiaryContext';

import { toast } from 'sonner';
import Loading from './loading';

import { postSummaryData } from './actions';
import { SummaryDataFromServer } from './interfaces';
import ProfileIcon from '@/components/ProfileIcon';

const SummaryPage = ({
  date,
  initialData,
}: {
  date: string;
  initialData: SummaryDataFromServer | null;
}) => {
  console.log(initialData, 'initialData');
  const { highlights, setHighlights } = useHighlights();
  const { learnings, setLearnings } = useLearnings();
  const { diaryContent, setDiaryContent } = useDiary();
  const { items: AcademicDataItems, setItems: setAcademicDataItems } =
    useAcademicData();
  const { items: CodingDataItems, setItems: setCodingDataItems } =
    useCodingData();
  const { items: PersonalDataItems, setItems: setPersonalDataItems } =
    usePersonalData();
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    if (initialData) {
      setHighlights(initialData.highlights);
      setLearnings(initialData.learnings);
      setDiaryContent(initialData.diaryContent);
      setAcademicDataItems(initialData.academicData || []);
      setCodingDataItems(initialData.codingData || []);
      setPersonalDataItems(initialData.personalData || []);
    }
  }, [initialData]);

  const isDateCorrect = () => {
    if (date !== 'today' && !isValidDateFormat(date)) {
      toast.error(
        'Please enter a valid date in YYYY-MM-DD format or enter today',
        {
          duration: 4000,
        }
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isDateCorrect()) {
      return;
    }

    if (!unsavedChanges) {
      toast.success('Already saved the data', { duration: 3000 });
      return;
    }

    const data: SummaryDataFromServer = {
      highlights,
      learnings,
      diaryContent,
      academicData: AcademicDataItems,
      codingData: CodingDataItems,
      personalData: PersonalDataItems,
    };

    try {
      const res = await postSummaryData(date, data);
      toast.success(`${res.message}`, { duration: 3000 });
      setUnsavedChanges(false);
    } catch (error) {
      toast.error('An unexpected error occurred.', {
        description: 'Please try again later.',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    unsavedChanges,
    highlights,
    learnings,
    diaryContent,
    AcademicDataItems,
    CodingDataItems,
    PersonalDataItems,
  ]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      console.log('in the handleBeforeUnload function');
      if (unsavedChanges) {
        e.preventDefault();
        console.log('Unsaved changes detected, prompting user.');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  return (
    <div>
      <div className="w-full flex justify-center items-center p-5 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-[#e3e3e7] sticky top-0">
        <div className="text-2xl font-bold w-1/4">Progress Path</div>
        <div className="w-1/2 flex justify-center items-center">
          {formatDateToStandard(
            date === 'today'
              ? formatDateToYYYYMMDD(new Date())
              : formatDateToYYYYMMDD(new Date(date))
          )}
        </div>
        <div className="w-1/4 flex justify-end items-center gap-10 mr-10">
          {unsavedChanges && (
            <span className="text-red-500 font-semibold">Unsaved Changes</span>
          )}
          <ProfileIcon />
        </div>
      </div>
      <div className="w-full border-b border-b-[#e3e3e7]">
        <div className="w-full flex rounded-lg">
          <div className="done w-[25%] min-h-[300px] flex flex-col justify-start gap-5 p-5">
            <div className="font-semibold text-xl text-center">Checklist</div>
            <AcademicData
              heading="Academics"
              setUnsavedChanges={setUnsavedChanges}
            />
            <CodingData
              heading="Coding"
              setUnsavedChanges={setUnsavedChanges}
            />
            <PersonalData
              heading="Personal"
              setUnsavedChanges={setUnsavedChanges}
            />
          </div>
          <div className="w-[40%] p-5">
            <div className="w-full h-full flex flex-col justify-start gap-5">
              <div className="font-semibold text-xl text-center">
                Daily Reflection
              </div>
              <Hightlights
                heading={'What did I achieve today?'}
                setUnsavedChanges={setUnsavedChanges}
              />
              <Learnings
                heading={'What did I learn today?'}
                setUnsavedChanges={setUnsavedChanges}
              />
            </div>
          </div>
          <div className="w-[35%] p-5">
            <div className="font-semibold text-xl text-center">Diary</div>
            <Diary setUnsavedChanges={setUnsavedChanges} />
          </div>
        </div>
      </div>
      <div className="submit mt-4 flex justify-center items-center">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default SummaryPage;
