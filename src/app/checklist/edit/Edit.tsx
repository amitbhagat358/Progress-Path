"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2, ListPlus } from "lucide-react";
import { Header } from "@/components/Header";
import { postDefaultChecklistData } from "@/app/actions/checklist";
import { toast } from "sonner";
import { ChecklistItemType } from "@/interfaces/summary";
import useWarnUnsavedChanges from "@/hooks/use-warn-unsaved";
import useSaveShortcut from "@/hooks/use-save-shortcut";

const EditChecklist = ({
  initialData,
}: {
  initialData: ChecklistItemType[];
}) => {
  const [checklistSections, setChecklistSections] = useState(initialData);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const updateHelper = (data: ChecklistItemType[]) => {
    setChecklistSections(data);
    setUnsavedChanges(true);
  };

  const addChecklistSection = () => {
    const newChecklistSection = {
      heading: "",
      checklist: [{ id: Date.now(), name: "", checked: false }],
    };
    updateHelper([...checklistSections, newChecklistSection]);
  };

  const addChecklist = (sectionIndex: number) => {
    const updatedSections = [...checklistSections];
    updatedSections[sectionIndex].checklist.push({
      id: Date.now(),
      name: "",
      checked: false,
    });
    updateHelper(updatedSections);
  };

  const handleHeadingChange = (sectionIndex: number, value: string) => {
    const updatedSections = [...checklistSections];
    updatedSections[sectionIndex].heading = value;
    updateHelper(updatedSections);
  };

  const handleChecklistChange = (
    sectionIndex: number,
    checklistIndex: number,
    value: string
  ) => {
    const updatedSections = [...checklistSections];
    updatedSections[sectionIndex].checklist[checklistIndex].name = value;
    updateHelper(updatedSections);
  };

  const handleChecklistCheckedChange = (
    sectionIndex: number,
    checklistIndex: number
  ) => {
    const updatedSections = [...checklistSections];
    updatedSections[sectionIndex].checklist[checklistIndex].checked =
      !updatedSections[sectionIndex].checklist[checklistIndex].checked;
    updateHelper(updatedSections);
  };

  const removeChecklistSection = (sectionIndex: number) => {
    const updatedSections = checklistSections.filter(
      (_, index) => index !== sectionIndex
    );
    updateHelper(updatedSections);
  };

  const removeChecklist = (sectionIndex: number, checklistIndex: number) => {
    const updatedSections = [...checklistSections];
    updatedSections[sectionIndex].checklist = updatedSections[
      sectionIndex
    ].checklist.filter((_, index) => index !== checklistIndex);
    updateHelper(updatedSections);
  };

  const handleSubmit = async () => {
    try {
      await postDefaultChecklistData(checklistSections);
      toast.success("Default checklist data updated.", { duration: 3000 });
      setUnsavedChanges(false);
    } catch (error) {
      toast.error("Error updating default checklist data.", { duration: 3000 });
      console.log("error submitting defaultChecklistData");
    }
  };

  useWarnUnsavedChanges(unsavedChanges);
  useSaveShortcut(handleSubmit);

  return (
    <div className="w-full container">
      {/* <Header /> */}
      <div className="w-full flex justify-center items-center mb-10 p-5">
        <div className="w-full md:w-[70%] flex justify-between">
          <div className="text-3xl underline underline-offset-8 decoration-1 decoration-primary font-semibold">
            Edit Default Checklist Data
          </div>
        </div>
      </div>
      <div className="w-full md:w-[70%] m-auto flex flex-col p-5">
        <div className="space-y-4">
          {checklistSections?.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="mb-4">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  <Input
                    type="text"
                    placeholder="Checklist Section Heading"
                    value={section.heading}
                    onChange={(e) =>
                      handleHeadingChange(sectionIndex, e.target.value)
                    }
                    className="font-bold"
                  />
                </CardTitle>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeChecklistSection(sectionIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {section?.checklist?.map((checklistItem, checklistIndex) => (
                  <div
                    key={checklistItem.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      checked={checklistItem.checked}
                      onCheckedChange={() =>
                        handleChecklistCheckedChange(
                          sectionIndex,
                          checklistIndex
                        )
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Checklist item"
                      value={checklistItem.name}
                      onChange={(e) =>
                        handleChecklistChange(
                          sectionIndex,
                          checklistIndex,
                          e.target.value
                        )
                      }
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        removeChecklist(sectionIndex, checklistIndex)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addChecklist(sectionIndex)}
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Checklist Item
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addChecklistSection}
            className="w-full text-primary hover:bg-primary hover:text-background"
          >
            <ListPlus className="h-4 w-4 mr-2" />
            Add Checklist Section
          </Button>
          <Button
            onClick={handleSubmit}
            variant="outline"
            className="w-full hover:bg-primary hover:text-background text-primary"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditChecklist;
