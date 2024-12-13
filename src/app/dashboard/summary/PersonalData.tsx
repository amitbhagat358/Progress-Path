import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { usePersonalData } from './context/PersonalDataContext'; // Assuming this context exists

interface PersonalDataProps {
  heading: string;
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}

interface Checkbox {
  id: number;
  name: string;
  checked: boolean;
}

const PersonalData: React.FC<PersonalDataProps> = ({
  heading,
  setUnsavedChanges,
}) => {
  const { items, setItems } = usePersonalData();
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
    setUnsavedChanges(true);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const updateItem = (id: number, name: string) => {
    setUnsavedChanges(true);
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const addItem = (index: number) => {
    setUnsavedChanges(true);
    const newDataItem = { id: Date.now(), name: '', checked: false };
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index + 1, 0, newDataItem);
      return updatedItems;
    });
    setEditableInputId(newDataItem.id);
  };

  const removeItem = (id: number) => {
    setUnsavedChanges(true);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (editableInputId === id) {
      setEditableInputId(null);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    item: Checkbox
  ) => {
    if (e.key === 'ArrowUp') {
      if (index > 0) {
        setEditableInputId(items[index - 1].id);
        editableInputRef.current[items[index - 1].id]?.focus();
      }
    } else if (e.key === 'ArrowDown') {
      if (index < items.length - 1) {
        setEditableInputId(items[index + 1].id);
        editableInputRef.current[items[index + 1].id]?.focus();
      }
    } else if (e.key === 'Enter') {
      addItem(index);
    } else if (item.name === '' && e.key === 'Backspace') {
      e.preventDefault();
      removeItem(item.id);
      if (index > 0) {
        setEditableInputId(items[index - 1].id);
        editableInputRef.current[items[index - 1].id]?.focus();
      }
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
              onKeyDown={(e) => handleKeyDown(e, index, item)}
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

export default PersonalData;
