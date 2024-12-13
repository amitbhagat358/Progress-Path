import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useLearnings } from './context/LearningsContext';

interface LearningsProps {
  heading: string;
}

const Learnings: React.FC<LearningsProps> = ({ heading }) => {
  const { learnings, setLearnings } = useLearnings();
  const [editableInputId, setEditableInputId] = useState<number | null>(null);
  const editableInputRef = useRef<{ [key: number]: HTMLInputElement | null }>(
    {}
  );

  const addLearning = (index?: number) => {
    const newLearning = { id: Date.now(), text: '' };
    setLearnings((prevLearnings) => {
      const updatedLearnings = [...prevLearnings];
      if (index !== undefined) {
        updatedLearnings.splice(index + 1, 0, newLearning);
      } else {
        updatedLearnings.push(newLearning);
      }
      return updatedLearnings;
    });
    setEditableInputId(newLearning.id);
  };

  const updateLearning = (id: number, text: string) => {
    setLearnings((prevLearnings) =>
      prevLearnings.map((learning) =>
        learning.id === id ? { ...learning, text } : learning
      )
    );
  };

  const removeLearning = (id: number) => {
    setLearnings((prevLearnings) =>
      prevLearnings.filter((learning) => learning.id !== id)
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

  return (
    <div className="w-full p-6 border border-[#e3e3e7] shadow-sm rounded-lg">
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
            className="flex items-center my-1 group hover:bg-gray-50 rounded"
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addLearning(index);
                }
              }}
              onClick={() => setEditableInputId(learning.id)}
              className={`text-[16px] leading-none border-none focus-visible:ring-0 shadow-none ${
                editableInputId !== learning.id ? 'cursor-pointer' : ''
              }`}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeLearning(learning.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
