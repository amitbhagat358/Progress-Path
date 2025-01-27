"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  formatDateToStandard,
  formatDateToYYYYMMDD,
  getPrevAndNextDate,
  isValidDateFormat,
} from "@/lib/utils";

import AcademicData from "./AcademicData";
import CodingData from "./CodingData";
import PersonalData from "./PersonalData";
import Hightlights from "./Highlights";
import Learnings from "./Learnings";
import Diary from "./Diary";

import { useHighlights } from "@/app/context/HighlightsContext";
import { useAcademicData } from "@/app/context/AcademicDataContext";
import { useCodingData } from "@/app/context/CodingDataContext";
import { usePersonalData } from "@/app/context/PersonalDataContext";
import { useLearnings } from "@/app/context/LearningsContext";
import { useDiary } from "@/app//context/DiaryContext";

import { toast } from "sonner";

import { postSummaryData } from "@/app/actions/summary";
import { SummaryDataFromServer } from "@/interfaces/summary";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";
import { SidebarTrigger } from "./ui/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  initial_academic_data,
  initial_coding_data,
  initial_personal_data,
} from "@/lib/initialData";

const SummaryPage = ({
  date,
  initialData,
}: {
  date: string;
  initialData: SummaryDataFromServer | null;
}) => {
  const { highlights, setHighlights } = useHighlights();
  const { learnings, setLearnings } = useLearnings();
  const { diaryContent, setDiaryContent } = useDiary();
  const { items: AcademicDataItems, setItems: setAcademicDataItems } =
    useAcademicData();
  const { items: CodingDataItems, setItems: setCodingDataItems } =
    useCodingData();
  const { items: PersonalDataItems, setItems: setPersonalDataItems } =
    usePersonalData();
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    if (initialData) {
      setHighlights(initialData.highlights);
      setLearnings(initialData.learnings);
      setDiaryContent(initialData.diaryContent);
      setAcademicDataItems(initialData.academicData);
      setCodingDataItems(initialData.codingData);
      setPersonalDataItems(initialData.personalData);
    } else {
      setDiaryContent("");
      setHighlights([]);
      setLearnings([]);
      setAcademicDataItems(initial_academic_data);
      setCodingDataItems(initial_coding_data);
      setPersonalDataItems(initial_personal_data);
    }
  }, [initialData]);

  const isDateCorrect = () => {
    if (date !== "today" && !isValidDateFormat(date)) {
      toast.error(
        "Please enter a valid date in YYYY-MM-DD format or enter today",
        {
          duration: 4000,
        }
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isDateCorrect()) {
      return;
    }

    if (!unsavedChanges) {
      toast.success("Already saved the data", { duration: 3000 });
      return;
    }

    const data: SummaryDataFromServer = {
      highlights,
      learnings,
      diaryContent,
      academicData: AcademicDataItems,
      codingData: CodingDataItems,
      personalData: PersonalDataItems,
    };

    try {
      const res = await postSummaryData(date, data);
      toast.success(`${res.message}`, { duration: 3000 });
      setUnsavedChanges(false);
    } catch (error) {
      toast.error("An unexpected error occurred.", {
        description: "Please try again later.",
        duration: 3000,
      });
    }
  };

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
  }, [
    unsavedChanges,
    highlights,
    learnings,
    diaryContent,
    AcademicDataItems,
    CodingDataItems,
    PersonalDataItems,
  ]);

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

  const { previousDate, nextDate } = getPrevAndNextDate(date);

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
              <AcademicData
                heading="Academics"
                setUnsavedChanges={setUnsavedChanges}
              />
              <CodingData
                heading="Coding"
                setUnsavedChanges={setUnsavedChanges}
              />
              <PersonalData
                heading="Personal"
                setUnsavedChanges={setUnsavedChanges}
              />
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
                  setUnsavedChanges={setUnsavedChanges}
                />
                <Learnings
                  heading={"What did I learn today?"}
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
          <Diary setUnsavedChanges={setUnsavedChanges} />
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
