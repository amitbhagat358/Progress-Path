'use client';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

const AddSummaryButton = () => {
  return (
    <div className="add-summary">
      <Link href="/dashboard/summary" prefetch={true}>
        <Button className="">
          <Pencil /> Add Summary for today
        </Button>
      </Link>
    </div>
  );
};

export default AddSummaryButton;
