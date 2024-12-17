'use client';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { formatDateToYYYYMMDD } from '@/lib/utils';

const CalendarForSummary = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div>
      <div className="add-summary flex justify-center items-center w-[300px] h-[300px] ml-5 my-5">
        <Calendar
          initialFocus
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={2024}
          toYear={2026}
          selected={date}
          onSelect={(selectedDate) => {
            console.log('Selected Date:', selectedDate);
            setDate(selectedDate || undefined);
          }}
          className="border border-[#e3e3e7] rounded-lg"
        />
      </div>
      <Link
        href={`/dashboard/summary/${formatDateToYYYYMMDD(date)}`}
        prefetch={true}
      >
        <Button className="ml-5">
          <Pencil /> Add Summary
        </Button>
      </Link>
    </div>
  );
};

export default CalendarForSummary;
