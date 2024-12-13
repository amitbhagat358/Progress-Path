import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useCodingData } from './context/CodingDataContext';

interface CodingDataProps {
  heading: string;
}

const CodingData: React.FC<CodingDataProps> = ({ heading }) => {
  const { items, setItems } = useCodingData();
  const [editableInputId, setEditableInputId] = useState<number | null>(null);
  const editableInputRef = useRef<{ [key: number]: HTMLInputElement | null }>(
    {}
  );

  useEffect(() => {
    if (editableInputId !== null && editableInputRef.current[editableInputId]) {
      editableInputRef.current[editableInputId]?.focus();
    }
  }, [editableInputId]);

  const toggleCheckbox = (id: number) => {
    setItems((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const updateItem = (id: number, name: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const addItem = (index?: number) => {
    const newDataItem = { id: Date.now(), name: '', checked: false };
    setItems((prevItems) => {
      const updatedData = [...prevItems];
      if (index !== undefined) {
        updatedData.splice(index + 1, 0, newDataItem);
      } else {
        updatedData.push(newDataItem);
      }
      return updatedData;
    });
    setEditableInputId(newDataItem.id);
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (editableInputId === id) {
      setEditableInputId(null);
    }
  };

  return (
    <div className="tasks w-full border border-[#e3e3e7] shadow-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold">{heading}</div>
        <Button
          onClick={() => addItem(items.length - 1)}
          variant="outline"
          size="sm"
        >
          <Plus />
        </Button>
      </div>
      {items.map((item, index) => {
        return (
          <div
            key={item.id}
            className="flex items-center my-1 group hover:bg-gray-50 rounded pl-4"
            onContextMenu={(e) => {
              e.preventDefault();
              toggleCheckbox(item.id);
            }}
          >
            <Checkbox
              id={`${item.id}`}
              checked={item.checked}
              onClick={() => toggleCheckbox(item.id)}
            />
            <Input
              ref={(el) => {
                if (editableInputRef.current) {
                  editableInputRef.current[item.id] = el;
                }
              }}
              value={item.name}
              onBlur={() => {
                setEditableInputId(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addItem(index);
                }
              }}
              onClick={() => setEditableInputId(item.id)}
              onChange={(e) => updateItem(item.id, e.target.value)}
              className={`text-sm leading-none border-none focus-visible:ring-0 shadow-none ${
                editableInputId !== item.id ? 'cursor-pointer' : ''
              }`}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeItem(item.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Trash />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default CodingData;
