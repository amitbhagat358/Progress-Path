'use client';
import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDateToYYYYMMDD } from '@/lib/utils';

const GetSummary = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="calendar">
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
        className="rounded-md border"
      />
      <Link
        href={`/dashboard/summary/${formatDateToYYYYMMDD(date)}`}
        prefetch={true}
      >
        <Button>Click me</Button>
      </Link>
    </div>
  );
};

export default GetSummary;
