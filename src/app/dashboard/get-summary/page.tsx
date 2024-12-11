'use client';
import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const GetSummary = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const formatDateToYYYYMMDD = (date: Date | undefined) => {
    if (!date) return '';
    const d = date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
          console.log('Selected Date:', selectedDate); // Debugging log
          setDate(selectedDate || undefined); // Ensure `undefined` is handled
        }}
        className="rounded-md border"
      />
      <Link
        href={`/dashboard/add-summary-for-today?date=${formatDateToYYYYMMDD(
          date
        )}`}
        prefetch={true}
      >
        <Button>Click me</Button>
      </Link>
    </div>
  );
};

export default GetSummary;
