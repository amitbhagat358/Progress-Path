"use client";
import { updatePurpose } from "@/app/actions/purposeActions";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useWarnUnsavedChanges from "@/hooks/use-warn-unsaved";
import { PurposeType } from "@/interfaces/purpose";
import { Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function EditPurpose({ data }: { data: PurposeType[] }) {
  const [items, setItems] = useState(data);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [newPurposeValue, setNewPurposeValue] = useState("");
  const buttonRef = useRef(null);

  const handleInputChange = (id: number, value: string) => {
    setItems((items) =>
      items?.map((item) =>
        item.id === id ? { ...item, text: value } : { ...item }
      )
    );
    setUnsavedChanges(true);
  };

  const handleAdd = () => {
    if (newPurposeValue === "") {
      toast.error("Purpose can't be empty.");
      return;
    }
    setItems((items) => [...items, { id: Date.now(), text: newPurposeValue }]);
    setNewPurposeValue("");
    setUnsavedChanges(true);
  };

  const handleDelete = (id: number) => {
    setItems((items) => items?.filter((item) => item.id !== id));
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      const updatedData = await updatePurpose(items);
      toast.success("Purpose Updated.", { duration: 3000 });
    } catch (err) {
      toast.error("Error Updating Purpose.", {
        description: "Try refreshing the page",
        duration: 3000,
      });
    }
    setUnsavedChanges(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        //using ref instead of directly calling handleSave from here is because the items is not getting updated to latest value because of asynchronous update of state
        //@ts-expect-error don't know
        if (buttonRef.current) buttonRef.current.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [unsavedChanges]);

  useWarnUnsavedChanges(unsavedChanges);

  return (
    <div className="w-full relative">
      {/* <Header /> */}
      <div className="w-full p-5">
        <div className="w-full flex justify-center items-center mb-10">
          <div className="w-full md:w-[70%] flex justify-between">
            <div className="text-3xl underline underline-offset-8 decoration-1 decoration-primary font-semibold">
              Edit Purpose
            </div>
          </div>
        </div>

        <div className="w-full md:w-[70%] m-auto flex flex-col">
          {items?.map((item) => (
            <div
              key={item.id}
              className="flex justify-center items-center gap-5 py-2"
            >
              <Input
                value={item.text}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
              ></Input>
              <Button variant={"outline"} onClick={() => handleDelete(item.id)}>
                <Trash />
              </Button>
            </div>
          ))}
        </div>

        <div className="w-full h-[130px] flex flex-col justify-center items-center gap-5 mt-10">
          <Input
            value={newPurposeValue}
            onChange={(e) => setNewPurposeValue(e.target.value)}
            className="w-full md:w-[70%]"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
                setNewPurposeValue("");
              }
            }}
          ></Input>
          <div className="w-full flex justify-center items-center gap-5">
            <Button variant={"outline"} onClick={handleAdd}>
              Add purpose
            </Button>
            <div className="flex justify-center items-center">
              <div className="">
                {unsavedChanges && (
                  <Button onClick={handleSave} ref={buttonRef}>
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
