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
      <div className="flex h-[300px] m-5">
        <Calendar
          initialFocus
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={2024}
          toYear={2026}
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate || undefined);
          }}
          className="rounded-lg border"
        />
      </div>
      <div className="ml-5">
        <Link
          href={`/dashboard/summary/${formatDateToYYYYMMDD(date)}`}
          prefetch={true}
        >
          <Button>
            <Pencil /> Get Summary
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CalendarForSummary;
