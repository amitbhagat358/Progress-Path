"use client";
import React, { useEffect, useState } from "react";

import ChecklistPart from "./ChecklistPart";
import { Header } from "./Header";

import { Button } from "@/components/ui/button";
import { postChecklistData } from "@/app/actions/checklist";
import { CheckboxType, ChecklistItemType } from "@/interfaces/summary";

import { toast } from "sonner";
import Link from "next/link";
import useWarnUnsavedChanges from "@/hooks/use-warn-unsaved";
import useSaveShortcut from "@/hooks/use-save-shortcut";
import { SidebarTrigger } from "./ui/sidebar";

const DialyChecklist = ({
  initialData,
}: {
  initialData: ChecklistItemType[];
}) => {
  const [checklistData, setChecklistData] = useState(initialData);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

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

  useWarnUnsavedChanges(unsavedChanges);
  useSaveShortcut(handleSave);

  return (
    <div className="w-full">
      <div className="w-full md:w-[70%] flex flex-col gap-4 m-auto p-5">
        <div className="w-full flex justify-between md:justify-center items-center font-semibold md:text-center text-3xl mb-6">
          <span className="underline underline-offset-8 decoration-1 decoration-primary">
            Today&apos;s Checklist
          </span>
          <SidebarTrigger className="md:hidden" />
        </div>
        <div className="border rounded-lg shadow-sm">
          {checklistData?.map((item, index) => (
            <ChecklistPart
              key={index}
              name={item.heading}
              data={item.checklist}
              handleChange={handleChecklistDataChange}
              setUnsavedChanges={setUnsavedChanges}
            />
          ))}
        </div>
        <div className="w-full flex justify-end">
          <Link
            href={"/checklist/edit"}
            className="underline hover:text-primary cursor-pointer font-semibold "
          >
            Edit Default Checklist
          </Link>
        </div>
        {unsavedChanges && <Button onClick={handleSave}>Save Changes</Button>}
      </div>
    </div>
  );
};

export default DialyChecklist;
