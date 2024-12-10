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
}

const HeadingWithPoints: React.FC<HeadingWithPointsProps> = ({ heading }) => {
  const [points, setPoints] = useState<BulletPoint[]>([]);
  const [editableInputId, setEditableInputId] = useState<number | null>(null);
  const editableInputRef = useRef<{ [key: number]: HTMLInputElement | null }>(
    {}
  );

  const addPoint = () => {
    const newPoint = { id: Date.now(), text: '' };
    setPoints((prevPoints) => [...prevPoints, newPoint]);
    setEditableInputId(newPoint.id);
  };

  const updatePoint = (id: number, text: string) => {
    setPoints((prevPoints) =>
      prevPoints.map((point) => (point.id === id ? { ...point, text } : point))
    );
  };

  const removePoint = (id: number) => {
    setPoints((prevPoints) => prevPoints.filter((point) => point.id !== id));
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
    <div className="w-[50%] p-6 border border-[#e5e7eb] shadow-sm rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold">{heading}</div>
        <Button onClick={addPoint} variant="outline" size="sm">
          <Plus />
        </Button>
      </div>
      <ul className="pl-4">
        {points.map((point) => (
          <li
            key={point.id}
            className="flex items-center space-x-2 my-1 group hover:bg-gray-50 rounded"
          >
            <div className="w-[36px] h-[36px] flex justify-center items-center">
              <span className="text-xl font-bold">•</span>
            </div>
            <Input
              type="text"
              id={`${point.id}`}
              onChange={(e) => updatePoint(point.id, e.target.value)}
              ref={(el) => {
                if (editableInputRef.current) {
                  editableInputRef.current[point.id] = el;
                }
              }}
              value={point.text}
              onBlur={() => setEditableInputId(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addPoint();
                }
              }}
              onClick={() => setEditableInputId(point.id)}
              className={`text-sm leading-none border-none focus-visible:ring-0 shadow-none ${
                editableInputId !== point.id ? 'cursor-pointer' : ''
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
