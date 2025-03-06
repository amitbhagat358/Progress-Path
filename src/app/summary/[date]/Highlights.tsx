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

interface HighlightsProps {
  heading: string;
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
  data: BulletPointType[];
  setData: Dispatch<SetStateAction<BulletPointType[]>>;
}

const Highlights: React.FC<HighlightsProps> = ({
  heading,
  setUnsavedChanges,
  data,
  setData,
}) => {
  const [highlights, setHighlights] = useState(data);
  const [editableInputId, setEditableInputId] = useState<number | null>(null);
  const editableInputRef = useRef<{ [key: number]: HTMLInputElement | null }>(
    {}
  );

  useEffect(() => {
    if (editableInputId !== null && editableInputRef.current[editableInputId]) {
      editableInputRef.current[editableInputId]?.focus();
    }
  }, [editableInputId]);

  const updateHighlights = (updatedHighlights: BulletPointType[]) => {
    setHighlights(updatedHighlights);
    setUnsavedChanges(true);
    setData(updatedHighlights);
  };

  const addHighlight = (index: number) => {
    const newHighlight = { id: Date.now(), text: "" };
    const updatedHighlights = [...highlights];
    updatedHighlights.splice(index + 1, 0, newHighlight);
    updateHighlights(updatedHighlights);
    setEditableInputId(newHighlight.id);
  };

  const updateHighlight = (id: number, text: string) => {
    const updatedHighlights = highlights.map((highlight) =>
      highlight.id === id ? { ...highlight, text } : highlight
    );
    updateHighlights(updatedHighlights);
  };

  const removeHighlight = (id: number) => {
    const updatedHighlights = highlights.filter(
      (highlight) => highlight.id !== id
    );
    updateHighlights(updatedHighlights);
    if (editableInputId === id) {
      setEditableInputId(null);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    highlight: BulletPointType
  ) => {
    if (e.key === "ArrowUp" && index > 0) {
      setEditableInputId(highlights[index - 1].id);
      editableInputRef.current[highlights[index - 1].id]?.focus();
    } else if (e.key === "ArrowDown" && index < highlights.length - 1) {
      setEditableInputId(highlights[index + 1].id);
      editableInputRef.current[highlights[index + 1].id]?.focus();
    } else if (e.key === "Enter") {
      addHighlight(index);
    } else if (highlight.text === "" && e.key === "Backspace") {
      e.preventDefault();
      removeHighlight(highlight.id);
      if (index > 0) {
        setEditableInputId(highlights[index - 1].id);
        editableInputRef.current[highlights[index - 1].id]?.focus();
      }
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="font-semibold">{heading}</div>
        <Button
          onClick={() => addHighlight(highlights.length - 1)}
          variant="outline"
          size="sm"
        >
          <Plus />
        </Button>
      </div>
      <ul className="pl-4">
        {highlights.map((highlight, index) => (
          <li
            key={highlight.id}
            className="flex items-center my-1 group rounded"
          >
            <div className="w-[36px] h-[36px] flex justify-center items-center">
              <span className="text-xl text-primary font-bold">•</span>
            </div>
            <Input
              type="text"
              id={`${highlight.id}`}
              onChange={(e) => updateHighlight(highlight.id, e.target.value)}
              ref={(el) => {
                if (editableInputRef.current) {
                  editableInputRef.current[highlight.id] = el;
                }
              }}
              value={highlight.text}
              onBlur={() => setEditableInputId(null)}
              onKeyDown={(e) => handleKeyDown(e, index, highlight)}
              onClick={() => setEditableInputId(highlight.id)}
              className={`text-base border-none focus-visible:ring-0 shadow-none transition-all ease-in-out duration-200 ${
                editableInputId !== highlight.id ? "cursor-pointer" : ""
              }`}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeHighlight(highlight.id)}
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

export default Highlights;
