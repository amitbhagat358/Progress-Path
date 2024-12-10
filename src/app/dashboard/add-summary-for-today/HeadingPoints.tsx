// components/HeadingWithPoints.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface BulletPoint {
  id: number;
  text: string;
}

interface HeadingWithPointsProps {
  heading: string;
  points: BulletPoint[];
  setPoints: React.Dispatch<React.SetStateAction<BulletPoint[]>>;
}

const HeadingWithPoints: React.FC<HeadingWithPointsProps> = ({
  heading,
  points,
  setPoints,
}) => {
  const addPoint = () => {
    setFirstInputOn(true);
    setPoints((prevPoints) => [
      { id: Date.now(), text: 'Add something' },
      ...prevPoints,
    ]);
  };

  const updatePoint = (id: number, text: string) => {
    setPoints((prevPoints) =>
      prevPoints.map((point) => (point.id === id ? { ...point, text } : point))
    );
  };

  const removePoint = (id: number) => {
    setPoints((prevPoints) => prevPoints.filter((point) => point.id !== id));
  };

  const saveData = () => {
    const dataToSave = {
      heading,
      points,
    };
    console.log('Data to save:', dataToSave);
  };

  const [editableCheckboxId, setEditableCheckboxId] = useState<number | null>(
    null
  );
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [firstInputOn, setFirstInputOn] = useState(false);

  useEffect(() => {
    if (firstInputRef.current && firstInputOn) {
      firstInputRef.current.focus();
      firstInputRef.current.select();
    }
  }, [firstInputOn]);

  return (
    <div className="w-[50%] p-6 border border-[#e5e7eb] shadow-sm rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold">{heading}</div>
        <Button onClick={() => addPoint()} variant="outline" size="sm">
          <Plus />
        </Button>
      </div>
      <ul className="pl-4">
        {points.map((point, index) => (
          <li
            key={point.id}
            className="flex items-center space-x-2 my-1 group hover:bg-gray-50 rounded"
          >
            <div className="w-[36px] h-[36px] flex justify-center items-center">
              <span className="text-xl font-bold">•</span>
            </div>
            <Input
              type="text"
              onChange={(e) => updatePoint(point.id, e.target.value)}
              ref={firstInputOn && index === 0 ? firstInputRef : null}
              value={point.text}
              onBlur={() => {
                setEditableCheckboxId(null);
                setFirstInputOn(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditableCheckboxId(null); // Exit edit mode on Enter
                  setFirstInputOn(false);
                  firstInputRef.current?.blur();
                }
              }}
              onClick={() => setEditableCheckboxId(point.id)}
              className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                editableCheckboxId !== point.id
                  ? 'cursor-pointer bg-transparent border-none focus-visible:ring-0 shadow-none'
                  : ''
              }`}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removePoint(point.id)}
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

export default HeadingWithPoints;
