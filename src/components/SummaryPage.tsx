"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./ui/mode-toggle";

import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  formatDateToStandard,
  formatDateToYYYYMMDD,
  getPrevAndNextDate,
} from "@/lib/utils";

import ChecklistPart from "./ChecklistPart";
import Hightlights from "./Highlights";
import Learnings from "./Learnings";
import Diary from "./Diary";

import { postSummaryData } from "@/app/actions/summary";

import {
  BulletPointType,
  CheckboxType,
  SummaryDataType,
} from "@/interfaces/summary";

import Link from "next/link";

const SummaryPage = ({
  date,
  initialData,
}: {
  date: string;
  initialData: SummaryDataType;
}) => {
  const [highlights, setHighlights] = useState(initialData?.highlights || []);
  const [learnings, setLearnings] = useState(initialData?.learnings || []);
  const [diaryContent, setDiaryContent] = useState(
    initialData?.diaryContent || ""
  );
  const [checklistData, setChecklistData] = useState(
    initialData?.checklistData || []
  );
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const { previousDate, nextDate } = getPrevAndNextDate(date);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [unsavedChanges, highlights, learnings, diaryContent, checklistData]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const handleSubmit = async () => {
    if (!unsavedChanges) {
      toast.success("Already saved the data", { duration: 3000 });
      return;
    }

    const data: SummaryDataType = {
      highlights,
      learnings,
      diaryContent,
      checklistData,
    };

    try {
      const res = await postSummaryData(date, data);
      toast.success(res.message, { duration: 3000 });
      setUnsavedChanges(false);
    } catch (error) {
      toast.error("An unexpected error occurred.", {
        description: "Please try again later.",
        duration: 3000,
      });
    }
  };

  const handleChecklistDataChange = (name: string, data: CheckboxType[]) => {
    setChecklistData((prev) =>
      prev.map((item) =>
        item.heading === name ? { heading: name, checklist: data } : item
      )
    );
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-between p-3 mb-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
        <div className="w-full flex justify-between mb-3">
          <SidebarTrigger />
          <div className="flex text-2xl font-bold ">
            <Link href={"/"}>Progress Path</Link>
          </div>
          <ModeToggle />
        </div>
        <div className="flex justify-center items-center gap-10">
          <div>
            <Link href={`/summary/${previousDate}`}>
              <Button size="sm" variant="outline">
                <ChevronLeft />
              </Button>
            </Link>
          </div>
          <div>
            {formatDateToStandard(
              date === "today"
                ? formatDateToYYYYMMDD(new Date())
                : formatDateToYYYYMMDD(new Date(date))
            )}
          </div>
          <div>
            <div>
              <Link href={`/summary/${nextDate}`}>
                <Button size="sm" variant="outline">
                  <ChevronRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          {unsavedChanges && (
            <div className="flex justify-center items-center mt-5 mb-2">
              <Button onClick={handleSubmit}>Save changes </Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-20">
        <div className="w-full flex flex-col md:flex-row justify-center gap-10 rounded-lg">
          <div className="done w-full md:w-[35%] min-h-[300px] flex flex-col justify-start gap-5 p-5">
            <div className="font-semibold text-3xl text-center pb-5">
              <span className="underline underline-offset-8 decoration-1 decoration-primary">
                Checklist
              </span>
            </div>
            <div className="border shadow-sm rounded-lg">
              {checklistData.map((item, index) => (
                <ChecklistPart
                  key={index}
                  name={item.heading}
                  data={item.checklist}
                  handleChange={handleChecklistDataChange}
                  setUnsavedChanges={setUnsavedChanges}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-[60%] p-5">
            <div className="w-full h-full flex flex-col justify-start gap-5">
              <div className="font-semibold text-3xl text-center pb-5">
                <span className="underline underline-offset-8 decoration-1 decoration-primary">
                  Daily Reflection
                </span>
              </div>
              <div className="border rounded-lg shadow-sm">
                <Hightlights
                  heading={"What did I achieve today?"}
                  data={highlights}
                  setData={setHighlights}
                  setUnsavedChanges={setUnsavedChanges}
                />
                <Learnings
                  heading={"What did I learn today?"}
                  data={learnings}
                  setData={setLearnings}
                  setUnsavedChanges={setUnsavedChanges}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-5">
          <div className="font-semibold text-3xl text-center pb-5">
            <span className="underline underline-offset-8 decoration-1 decoration-primary">
              Diary
            </span>
          </div>
          <Diary
            setUnsavedChanges={setUnsavedChanges}
            data={diaryContent}
            setData={setDiaryContent}
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
