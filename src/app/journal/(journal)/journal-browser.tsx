"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, ChevronRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function JournalBrowser({
  initialYear,
  availableYears,
}: {
  initialYear: number;
  availableYears: number[];
}) {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const monthsInYear = selectedYear === currentYear ? currentMonth : 12;

  const allMonths = Array.from({ length: monthsInYear }, (_, i) => {
    return {
      month: i + 1,
      previewImage: `/month-${i}.jpg`,
    };
  });

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="w-full ">
          <div className="w-full flex justify-between items-center text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-0">
            <div>Journal Archive</div>
            <SidebarTrigger className="md:hidden" />
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(Number.parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button asChild>
            <Link
              href={`/journal/${currentYear}/${currentMonth}/${format(
                currentDate,
                "d"
              )}`}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Today&apos;s Journal
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {allMonths.map((monthData) => (
          <MonthCard
            key={monthData.month}
            year={selectedYear}
            month={monthData.month}
            previewImage={monthData.previewImage}
          />
        ))}
      </div>
    </div>
  );
}

function MonthCard({
  year,
  month,
  previewImage,
}: {
  year: number;
  month: number;
  previewImage?: string;
}) {
  const monthName = format(new Date(year, month - 1, 1), "MMMM");

  return (
    <Link href={`/journal/${year}/${month}`}>
      <Card
        className={`h-full transition-all hover:shadow-md overflow-hidden border-primary/30`}
      >
        <CardContent className="p-0 h-full">
          <div className="relative h-48 bg-muted">
            {previewImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${previewImage})` }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Calendar className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" /> */}
          </div>

          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold">{monthName}</h2>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
