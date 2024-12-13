'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
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
import Loading from './loading';

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

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/summary?date=${date}`);

        if (res.redirected) {
          window.location.href = res.url;
          return;
        }

        const data = await res.json();
        if (data.length > 0) {
          const latest = data[data.length - 1];
          setHighlights(latest.highlights);
          setLearnings(latest.learnings);
          setDiaryContent(latest.diaryContent);
          setAcademicDataItems(latest.academicData);
          setCodingDataItems(latest.codingData);
          setPersonalDataItems(latest.personalData);
        }
        setLoading(false);
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

  const handleSubmit = async () => {
    const data = {
      highlights,
      learnings,
      diaryContent,
      academicData: AcademicDataItems,
      codingData: CodingDataItems,
      personalData: PersonalDataItems,
    };

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
      setUnsavedChanges(false);
    } catch (error) {
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
          <div className="done w-[25%] min-h-[300px] flex flex-col justify-between gap-5 p-5 border-r border-r-[#e3e3e7]">
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
              <Hightlights
                heading={'Highlights of the day'}
                setUnsavedChanges={setUnsavedChanges}
              />
              <Learnings
                heading={'Learnings of the day'}
                setUnsavedChanges={setUnsavedChanges}
              />
            </div>
          </div>
          <div className="w-[35%] p-5">
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
