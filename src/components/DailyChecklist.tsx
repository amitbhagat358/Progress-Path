"use client";
import React, { useEffect, useState } from "react";

import ChecklistPart from "./ChecklistPart";
import { Header } from "./Header";

import { Button } from "@/components/ui/button";
import { postChecklistData } from "@/app/actions/dailyChecklist";
import { CheckboxType, ChecklistItemType } from "@/interfaces/summary";

import { toast } from "sonner";

const DialyChecklist = ({
  initialData,
}: {
  initialData: ChecklistItemType[];
}) => {
  const [checklistData, setChecklistData] = useState(initialData);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [unsavedChanges, checklistData]);

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

  const handleSave = async () => {
    if (!unsavedChanges) {
      toast.success("Already saved the data", { duration: 3000 });
      return;
    }

    try {
      const res = await postChecklistData(checklistData);
      toast.success(res.message, { duration: 3000 });
      setUnsavedChanges(false);
    } catch (err) {
      console.log("Error saving data:", err);
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
      <Header />
      <div className="w-full md:w-[70%] flex flex-col gap-4 m-auto p-5">
        <div className="font-semibold md:text-center text-3xl mb-6">
          <span className="underline underline-offset-8 decoration-1 decoration-primary">
            Today&apos;s Checklist
          </span>
        </div>
        <div className="border rounded-lg shadow-sm">
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
        {unsavedChanges && <Button onClick={handleSave}>Save Changes</Button>}
      </div>
    </div>
  );
};

export default DialyChecklist;
