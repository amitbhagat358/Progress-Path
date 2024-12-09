'use client';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

const AddSummaryButton = () => {
  return (
    <div className="add-summary text-[#EEEEEE]">
      <Link href="/dashboard/add-summary-for-today" prefetch={true}>
        <Button className="">
          <Pencil /> Add Summary for today
        </Button>
      </Link>
    </div>
  );
};

export default AddSummaryButton;
