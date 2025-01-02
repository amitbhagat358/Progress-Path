'use client';
import React, { useEffect, useState } from 'react';
import { useAcademicData } from '@/app/context/AcademicDataContext';
import { useCodingData } from '../app/context/CodingDataContext';
import { usePersonalData } from '../app/context/PersonalDataContext';
import AcademicData from './AcademicData';
import CodingData from './CodingData';
import PersonalData from './PersonalData';
import { Button } from '@/components/ui/button';
import { postDailyChecklist } from '../app/actions/dailyChecklist';
import { DailyChecklistType } from '@/interfaces/checklist';
import { toast } from 'sonner';

interface DialyChecklistProps {
  initialData: DailyChecklistType | null;
}

const DialyChecklist = ({ initialData }: DialyChecklistProps) => {
  const { items: AcademicDataItems, setItems: setAcademicDataItems } =
    useAcademicData();
  const { items: CodingDataItems, setItems: setCodingDataItems } =
    useCodingData();
  const { items: PersonalDataItems, setItems: setPersonalDataItems } =
    usePersonalData();

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleSave = async () => {
    if (!unsavedChanges) {
      toast.success('Already saved the data', { duration: 3000 });
      return;
    }

    try {
      const data = {
        academicData: AcademicDataItems,
        codingData: CodingDataItems,
        personalData: PersonalDataItems,
      };
      console.log(data);
      const res = await postDailyChecklist(data);
      toast.success(`${res.message}`, { duration: 3000 });
      setUnsavedChanges(false);
    } catch (err) {
      console.log('Error saving data:', err);
      toast.error('An unexpected error occurred.', {
        description: 'Please try again later.',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    console.log(initialData);
    if (initialData) {
      setAcademicDataItems(initialData.academicData || []);
      setCodingDataItems(initialData.codingData || []);
      setPersonalDataItems(initialData.personalData || []);
    }
  }, [initialData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [unsavedChanges, AcademicDataItems, CodingDataItems, PersonalDataItems]);

  return (
    <div>
      <div className="flex flex-col gap-4 m-5 p-5 rounded-xl">
        <div className="font-semibold text-3xl mb-6">
          Today&apos;s Checklist
        </div>
        <AcademicData
          heading="Academics"
          setUnsavedChanges={setUnsavedChanges}
        />
        <CodingData heading="Coding" setUnsavedChanges={setUnsavedChanges} />
        <PersonalData
          heading="Personal"
          setUnsavedChanges={setUnsavedChanges}
        />
        <Button
          onClick={handleSave}
          disabled={!unsavedChanges}
          // variant={unsavedChanges ? '' : 'secondary'}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default DialyChecklist;