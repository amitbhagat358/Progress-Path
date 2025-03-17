import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ImageIcon, MoreHorizontal, Plus } from "lucide-react";
import RichTextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getJournalByDate } from "@/app/actions/journal";
import FullscreenWrapper from "./components/full-screen-wrapper";

interface JournalEntryPageProps {
  params: Promise<{
    year: string;
    month: string;
    date: string;
  }>;
}

export default async function JournalEntryPage({
  params,
}: JournalEntryPageProps) {
  const { year, month, date } = await params;

  // store the date in start of day in midnight
  const entryDate = new Date(
    Date.UTC(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(date),
      0,
      0,
      0,
      0
    )
  );

  const content = await getJournalByDate(entryDate);

  // Format the date as "Thursday, August 29, 2024"
  const formattedDate = format(entryDate, "EEEE, MMMM d, yyyy");

  return (
    <div className="w-full relative min-h-screen bg-background">
      {/* Header */}
      <header className="w-full sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-14 items-center px-4 md:px-10">
          <div className="flex flex-1 items-center justify-between">
            <Link
              href={`/journal/${year}/${month}`}
              className="flex items-center space-x-2"
            >
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {formattedDate}
              </span>
            </Link>

            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <ImageIcon />
                    Image
                  </DropdownMenuItem>
                  <DropdownMenuItem>Youtube</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}

      <FullscreenWrapper>
        <main className="editor-main w-full">
          <div className="w-full space-y-8">
            <RichTextEditor content={content} date={entryDate} />
          </div>
        </main>
      </FullscreenWrapper>
      {/* <main className="w-full">
        <div className="w-full space-y-8">
          <RichTextEditor content={content} date={entryDate} />
        </div>
      </main> */}

      {/* <footer className="w-full fixed bottom-0 px-5 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-lg items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">My Journal</span>
            <span className="text-sm text-muted-foreground">72 Words</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                <line x1="16" y1="8" x2="2" y2="22" />
                <line x1="17.5" y1="15" x2="9" y2="15" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M17 10H3" />
                <path d="M21 6H3" />
                <path d="M21 14H3" />
                <path d="M17 18H3" />
              </svg>
            </Button>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
