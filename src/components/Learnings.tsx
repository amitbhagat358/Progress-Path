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
import { useLearnings } from '@/app/context/LearningsContext';
import { BulletPointType } from '@/interfaces/summary';

interface LearningsProps {
  heading: string;
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}

const Learnings: React.FC<LearningsProps> = ({
  heading,
  setUnsavedChanges,
}) => {
  const { learnings, setLearnings } = useLearnings();
  const [editableInputId, setEditableInputId] = useState<number | null>(null);
  const editableInputRef = useRef<{ [key: number]: HTMLInputElement | null }>(
    {}
  );

  const addLearning = (index: number) => {
    setUnsavedChanges(true);
    const newLearning = { id: Date.now(), text: '' };
    setLearnings((prevLearnings) => {
      const updatedLearnings = [...prevLearnings];
      updatedLearnings.splice(index + 1, 0, newLearning);
      return updatedLearnings;
    });
    setEditableInputId(newLearning.id);
  };

  const updateLearning = (id: number, text: string) => {
    setUnsavedChanges(true);
    setLearnings((prevLearnings) =>
      prevLearnings.map((learning) =>
        learning.id === id ? { ...learning, text } : learning
      )
    );
  };

  const removeLearning = (id: number) => {
    setUnsavedChanges(true);
    setLearnings((prevLearnings) =>
      prevLearnings.filter((learning) => learning.id !== id)
    );
    if (editableInputId === id) {
      setEditableInputId(null);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    Highlight: BulletPointType
  ) => {
    if (e.key === 'ArrowUp') {
      if (index > 0) {
        setEditableInputId(learnings[index - 1].id);
        editableInputRef.current[learnings[index - 1].id]?.focus();
      }
    } else if (e.key === 'ArrowDown') {
      if (index < learnings.length - 1) {
        setEditableInputId(learnings[index + 1].id);
        editableInputRef.current[learnings[index + 1].id]?.focus();
      }
    } else if (e.key === 'Enter') {
      addLearning(index);
    } else if (Highlight.text === '' && e.key === 'Backspace') {
      e.preventDefault();
      removeLearning(Highlight.id);
      if (index > 0) {
        setEditableInputId(learnings[index - 1].id);
        editableInputRef.current[learnings[index - 1].id]?.focus();
      }
    }
  };

  useEffect(() => {
    if (editableInputId !== null && editableInputRef.current[editableInputId]) {
      editableInputRef.current[editableInputId]?.focus();
    }
  }, [editableInputId]);

  return (
    <div className="w-full p-6 border shadow-sm rounded-lg">
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
      <ul className="pl-4">
        {learnings.map((learning, index) => (
          <li
            key={learning.id}
            className="flex items-center my-1 group rounded"
          >
            <div className="w-[36px] h-[36px] flex justify-center items-center">
              <span className="text-xl font-bold">•</span>
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
              className={`text-[16px] leading-none border-none focus-visible:ring-0 shadow-none ${
                editableInputId !== learning.id ? 'cursor-pointer' : ''
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
