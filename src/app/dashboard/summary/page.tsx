'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatDate, isValidDateFormat } from '@/lib/utils';

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
import { useSearchParams } from 'next/navigation';
import { useDiary } from './context/DiaryContext';

import { toast } from 'sonner';
import Loading from './loading';

import { fetchSummaryData, postSummaryData } from './actions';
import { SummaryDataFromServer } from './interfaces';

const AddSummaryPage = () => {
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
  const [loading, setLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const date = searchParams.get('date');

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

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const updateContextData = (latest: SummaryDataFromServer) => {
    setHighlights(latest.highlights);
    setLearnings(latest.learnings);
    setDiaryContent(latest.diaryContent);
    setAcademicDataItems(latest.academicData || []);
    setCodingDataItems(latest.codingData || []);
    setPersonalDataItems(latest.personalData || []);
  };

  const isDateCorrect = () => {
    if (!isValidDateFormat(date)) {
      toast.error('Please enter a valid date in YYYY-MM-DD format', {
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  // get handler
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchSummaryData(date);
        if (res?.length > 0) {
          const latest: SummaryDataFromServer = res[res.length - 1];
          updateContextData(latest);
        }
      } catch (error) {
        toast.error(`Error fetching summary for ${date}.`, {
          description: "Redirecting to today's summary",
          duration: 3000,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [date]);

  //post handler
  const handleSubmit = async () => {
    if (!isDateCorrect()) {
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
      await postSummaryData(date, data);
      toast.success(`Summary data saved for ${formatDate(date)}`, {
        duration: 3000,
      });
      setUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(`Error Saving the data for ${formatDate(date)}.`, {
        description: `Please try again later.`,
        duration: 3000,
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="w-full flex justify-center items-center p-5 border bg-white border-b-[#e3e3e7] sticky top-0">
        <div className="text-2xl font-bold w-1/4">Progress Path</div>
        <div className="w-1/2 flex justify-center items-center">
          {formatDate(date)}
        </div>
        <div className="w-1/4 flex justify-end items-center gap-10">
          {unsavedChanges && (
            <span className="text-red-500 font-semibold">Unsaved Changes</span>
          )}
          <div>profile</div>
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

export default AddSummaryPage;
