import { Calendar } from "./ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface CalendForInputProps {
  date: Date | undefined;
  onDateChange: (selectedDate: Date | undefined) => void;
}

export function CalendForInput({ onDateChange, date }: CalendForInputProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          <CalendarIcon />
          {date ? format(date, "dd-MM-yyyy") : "Select Deadline"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex h-[300px]">
          <Calendar
            initialFocus
            mode="single"
            captionLayout="dropdown-buttons"
            fromYear={2024}
            toYear={2026}
            selected={date}
            onSelect={(selectedDate) => {
              onDateChange(selectedDate);
            }}
            className="rounded-lg"
          />
        </div>
        <DropdownMenuItem className="focus:bg-transparent mt-2">
          <Button className="w-1/3" onClick={() => onDateChange(undefined)}>
            Reset
          </Button>
          <Button className="w-1/3" onClick={() => onDateChange(new Date())}>
            Today
          </Button>
          <Button className="w-1/3">{date ? "Select" : "Cancel"}</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
