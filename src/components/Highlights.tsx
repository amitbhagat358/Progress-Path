import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHighlights } from '@/app/context/HighlightsContext';
import { BulletPointType } from '@/interfaces/summary';

interface HighlightsProps {
  heading: string;
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}

const Highlights: React.FC<HighlightsProps> = ({
  heading,
  setUnsavedChanges,
}) => {
  const { highlights, setHighlights } = useHighlights();
  const [editableInputId, setEditableInputId] = useState<number | null>(null);
  const editableInputRef = useRef<{ [key: number]: HTMLInputElement | null }>(
    {}
  );

  const addHighlight = (index: number) => {
    setUnsavedChanges(true);
    const newHighlight = { id: Date.now(), text: '' };
    setHighlights((prevhighlights) => {
      const updatedhighlights = [...prevhighlights];
      updatedhighlights.splice(index + 1, 0, newHighlight);
      return updatedhighlights;
    });
    setEditableInputId(newHighlight.id);
  };

  const updateHighlight = (id: number, text: string) => {
    setUnsavedChanges(true);
    setHighlights((prevhighlights) =>
      prevhighlights.map((Highlight) =>
        Highlight.id === id ? { ...Highlight, text } : Highlight
      )
    );
  };

  const removeHighlight = (id: number) => {
    setUnsavedChanges(true);
    setHighlights((prevhighlights) =>
      prevhighlights.filter((Highlight) => Highlight.id !== id)
    );
    if (editableInputId === id) {
      setEditableInputId(null);
    }
  };

  useEffect(() => {
    if (editableInputId !== null && editableInputRef.current[editableInputId]) {
      editableInputRef.current[editableInputId]?.focus();
    }
  }, [editableInputId]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    Highlight: BulletPointType
  ) => {
    if (e.key === 'ArrowUp') {
      if (index > 0) {
        setEditableInputId(highlights[index - 1].id);
        editableInputRef.current[highlights[index - 1].id]?.focus();
      }
    } else if (e.key === 'ArrowDown') {
      if (index < highlights.length - 1) {
        setEditableInputId(highlights[index + 1].id);
        editableInputRef.current[highlights[index + 1].id]?.focus();
      }
    } else if (e.key === 'Enter') {
      addHighlight(index);
    } else if (Highlight.text === '' && e.key === 'Backspace') {
      e.preventDefault();
      removeHighlight(Highlight.id);
      if (index > 0) {
        setEditableInputId(highlights[index - 1].id);
        editableInputRef.current[highlights[index - 1].id]?.focus();
      }
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="text-primary font-semibold">{heading}</div>
        <Button
          onClick={() => addHighlight(highlights.length - 1)}
          variant="outline"
          size="sm"
        >
          <Plus />
        </Button>
      </div>
      <ul className="pl-4">
        {highlights.map((Highlight, index) => (
          <li
            key={Highlight.id}
            className="flex items-center my-1 group rounded"
          >
            <div className="w-[36px] h-[36px] flex justify-center items-center">
              <span className="text-xl font-bold">•</span>
            </div>
            <Input
              type="text"
              id={`${Highlight.id}`}
              onChange={(e) => updateHighlight(Highlight.id, e.target.value)}
              ref={(el) => {
                if (editableInputRef.current) {
                  editableInputRef.current[Highlight.id] = el;
                }
              }}
              value={Highlight.text}
              onBlur={() => setEditableInputId(null)}
              onKeyDown={(e) => handleKeyDown(e, index, Highlight)}
              onClick={() => setEditableInputId(Highlight.id)}
              className={`text-base border-none focus-visible:ring-0 shadow-none ${
                editableInputId !== Highlight.id ? 'cursor-pointer' : ''
              }`}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeHighlight(Highlight.id)}
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
