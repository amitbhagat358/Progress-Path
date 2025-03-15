"use client";

import { format, getDaysInMonth, isSameDay } from "date-fns";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { JSDOM } from "jsdom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Calendar } from "lucide-react";

interface JournalEntry {
  date: Date;
  title: string;
  description: string;
  location?: string;
  tags?: string[];
  imageUrl?: string;
  highlighted?: boolean;
}

interface JournalEntryCardProps {
  date: Date;
  title: string;
  description: string;
  location?: string;
  tags?: string[];
  imageUrl?: string;
  isHighlighted?: boolean;
}

export default function JournalPage({
  year,
  month,
  initialEntries,
}: {
  year: number;
  month: number;
  initialEntries: JournalEntry[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [showMissingDays, setShowMissingDays] = useState(false);

  const monthName = format(new Date(year, month - 1), "MMMM");
  const daysInMonth = getDaysInMonth(new Date(year, month - 1));

  // Filter entries based on search term
  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.location &&
        entry.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (entry.tags &&
        entry.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  // Generate missing days
  const missingDays = [];
  if (showMissingDays) {
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month - 1, day);
      const hasEntry = entries.some((entry) =>
        isSameDay(entry.date, currentDate)
      );

      if (!hasEntry) {
        missingDays.push({
          date: currentDate,
          title: "Add new entry",
          description: "No entry for this day yet",
          imageUrl: "/placeholder.jpg",
          highlighted: false,
        });
      }
    }
  }

  // Combine filtered entries with missing days if showing missing days
  const displayEntries = showMissingDays
    ? [...filteredEntries, ...missingDays].sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      )
    : filteredEntries;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-md md:max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {monthName} {year}
        </h1>

        <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search journals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setShowMissingDays(!showMissingDays)}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            {showMissingDays ? "Hide empty days" : "Show empty days"}
          </Button>
        </div>
      </div>

      {displayEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No journal entries found for your search.
          </p>
          <Button asChild>
            <Link href={`/journal/${year}/${month}/1`}>
              <Plus className="mr-2 h-4 w-4" /> Create New Entry
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {displayEntries.map((entry, index) => (
            <Link
              href={`/journal/${year}/${month}/${format(entry.date, "d")}`}
              key={index}
            >
              <JournalEntryCard
                date={entry.date}
                title={entry.title}
                description={entry.description}
                location={entry.location}
                tags={entry.tags}
                imageUrl={entry.imageUrl || "/placeholder.jpg"}
                isHighlighted={entry.highlighted}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function JournalEntryCard({
  date,
  title,
  description,
  location,
  tags,
  imageUrl,
  isHighlighted = true,
}: JournalEntryCardProps) {
  const dayOfWeek = format(date, "EEE").toUpperCase();
  const dayOfMonth = format(date, "d");
  const isNewEntry = title === "Add new entry";

  return (
    <Card
      className={cn(
        "overflow-hidden border bg-card hover:shadow-md transition-shadow",
        isHighlighted ? "border-primary/50" : "",
        isNewEntry ? "border-dashed border-muted-foreground/50" : ""
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-stretch">
          <div
            className={cn(
              "flex flex-col items-center justify-center p-4 w-20 text-center",
              isNewEntry ? "bg-muted" : ""
            )}
          >
            <span className="text-sm text-muted-foreground font-medium">
              {dayOfWeek}
            </span>
            <span className="text-3xl font-bold text-foreground">
              {dayOfMonth}
            </span>
          </div>

          <div className="flex-1 p-4">
            <h3 className="font-medium text-base text-foreground">
              {isNewEntry ? (
                <span className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> {title}
                </span>
              ) : (
                title
              )}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-blue-500 dark:text-blue-400 bg-transparent hover:bg-transparent px-0 mr-1"
                  >
                    {tag},
                  </Badge>
                ))}
                {location && <span>{location}</span>}
              </div>
            )}
          </div>

          <div className="flex justify-center items-center w-20 relative">
            <Image
              src={imageUrl || "/placeholder.jpg"}
              alt={title}
              fill
              className={cn(
                "object-cover h-full",
                isNewEntry ? "opacity-50" : ""
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
