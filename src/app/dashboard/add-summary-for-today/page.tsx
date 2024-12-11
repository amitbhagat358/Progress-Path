'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import AcademicData from './AcademicData';
import CodingData from './CodingData';
import PersonalData from './PersonalData';
import Hightlights from './Highlights';
import { useHighlights } from './context/HighlightsContext';
import { useAcademicData } from './context/AcademicDataContext';
import { useCodingData } from './context/CodingDataContext';
import { usePersonalData } from './context/PersonalDataContext';
import { useSearchParams } from 'next/navigation';

const AddSummaryPage = () => {
  const searchParams = useSearchParams();
  const date: string | null = searchParams.get('date');

  const { highlights, setHighlights } = useHighlights();
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
        if (data.length > 0) {
          const latest = data[data.length - 1];
          setHighlights(latest.highlights);
          setAcademicDataItems(latest.academicData);
          setCodingDataItems(latest.codingData);
          setPersonalDataItems(latest.personalData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const data = {
      highlights,
      academicData: AcademicDataItems,
      codingData: CodingDataItems,
      personalData: PersonalDataItems,
    };

    console.log('data', data);

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

      alert('Data saved successfully');
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="font-semibold text-xl p-5 text-end">
        {formatDate(date)}
      </div>
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
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default AddSummaryPage;
