import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BulletPointType } from "@/interfaces/summary";

interface LearningsProps {
  heading: string;
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
  data: BulletPointType[];
  setData: Dispatch<SetStateAction<BulletPointType[]>>;
}

const Learnings: React.FC<LearningsProps> = ({
  heading,
  setUnsavedChanges,
  data,
  setData,
}) => {
  const [learnings, setLearnings] = useState(data);
  const [editableInputId, setEditableInputId] = useState<number | null>(null);
  const editableInputRef = useRef<{ [key: number]: HTMLInputElement | null }>(
    {}
  );

  useEffect(() => {
    if (editableInputId !== null && editableInputRef.current[editableInputId]) {
      editableInputRef.current[editableInputId]?.focus();
    }
  }, [editableInputId]);

  const updateLearnings = (updatedLearnings: BulletPointType[]) => {
    setLearnings(updatedLearnings);
    setUnsavedChanges(true);
    setData(updatedLearnings);
  };

  const addLearning = (index: number) => {
    const newLearning = { id: Date.now(), text: "" };
    const updatedLearnings = [...learnings];
    updatedLearnings.splice(index + 1, 0, newLearning);
    updateLearnings(updatedLearnings);
    setEditableInputId(newLearning.id);
  };

  const updateLearning = (id: number, text: string) => {
    const updatedLearnings = learnings.map((learning) =>
      learning.id === id ? { ...learning, text } : learning
    );
    updateLearnings(updatedLearnings);
  };

  const removeLearning = (id: number) => {
    const updatedLearnings = learnings.filter((learning) => learning.id !== id);
    updateLearnings(updatedLearnings);
    if (editableInputId === id) {
      setEditableInputId(null);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    learning: BulletPointType
  ) => {
    if (e.key === "ArrowUp" && index > 0) {
      setEditableInputId(learnings[index - 1].id);
      editableInputRef.current[learnings[index - 1].id]?.focus();
    } else if (e.key === "ArrowDown" && index < learnings.length - 1) {
      setEditableInputId(learnings[index + 1].id);
      editableInputRef.current[learnings[index + 1].id]?.focus();
    } else if (e.key === "Enter") {
      addLearning(index);
    } else if (learning.text === "" && e.key === "Backspace") {
      e.preventDefault();
      removeLearning(learning.id);
      if (index > 0) {
        setEditableInputId(learnings[index - 1].id);
        editableInputRef.current[learnings[index - 1].id]?.focus();
      }
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="font-semibold">{heading}</div>
        <Button
          onClick={() => addLearning(learnings.length - 1)}
          variant="outline"
          size="sm"
        >
          <Plus />
        </Button>
      </div>
      <ul className="pl-4 mt-4">
        {learnings.map((learning, index) => (
          <li
            key={learning.id}
            className="flex items-center my-2 group rounded"
          >
            <div className="w-[36px] h-[36px] flex justify-center items-center">
              <span className="text-xl text-primary font-bold">•</span>
            </div>
            <Input
              type="text"
              id={`${learning.id}`}
              onChange={(e) => updateLearning(learning.id, e.target.value)}
              ref={(el) => {
                if (editableInputRef.current) {
                  editableInputRef.current[learning.id] = el;
                }
              }}
              value={learning.text}
              onBlur={() => setEditableInputId(null)}
              onKeyDown={(e) => handleKeyDown(e, index, learning)}
              onClick={() => setEditableInputId(learning.id)}
              className={`text-base border-none focus-visible:ring-0 shadow-none transition-all ease-in-out duration-200 ${
                editableInputId !== learning.id ? "cursor-pointer" : ""
              }`}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeLearning(learning.id)}
              className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
            >
              <Trash />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Learnings;
