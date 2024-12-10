import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type HeadingCheckboxType = {
  id: number;
  name: string;
  type: 'heading' | 'checkbox';
  childrens: HeadingCheckboxType[];
  checked?: boolean;
};

interface AcademicDataProps {
  academicData: HeadingCheckboxType[];
  setAcademicData: React.Dispatch<React.SetStateAction<HeadingCheckboxType[]>>;
}

const AcademicData = ({ academicData, setAcademicData }: AcademicDataProps) => {
  const toggleCheckbox = (id: number) => {
    const updateData = (
      items: HeadingCheckboxType[]
    ): HeadingCheckboxType[] => {
      return items.map((item) => {
        if (item.id === id && item.type === 'checkbox') {
          return { ...item, checked: !item.checked };
        }
        if (item.childrens && item.childrens.length > 0) {
          return { ...item, childrens: updateData(item.childrens) };
        }
        return item;
      });
    };

    setAcademicData((prevAcademicData) => updateData(prevAcademicData));
  };

  const handleCheckboxNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updateData = (
      items: HeadingCheckboxType[]
    ): HeadingCheckboxType[] => {
      return items.map((item) => {
        if (item.id === id && item.type === 'checkbox') {
          return { ...item, name: e.target.value };
        }
        if (item.childrens && item.childrens.length > 0) {
          return { ...item, childrens: updateData(item.childrens) };
        }
        return item;
      });
    };

    setAcademicData((prevAcademicData) => {
      const newData = updateData(prevAcademicData);
      console.log(newData);
      return newData;
    });
  };

  const handleAddCheckbox = (id: number) => {
    setInputOn(true);
    setAcademicData((prevData) => {
      const updateData = (
        items: HeadingCheckboxType[]
      ): HeadingCheckboxType[] =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                childrens: [
                  {
                    id: Date.now(),
                    name: 'Add something',
                    type: 'checkbox',
                    checked: true,
                    childrens: [],
                  },
                  ...item.childrens,
                ],
              }
            : { ...item, childrens: updateData(item.childrens) }
        );

      return updateData(prevData);
    });
  };

  const handleCheckboxDelete = (id: number) => {
    const deleteData = (items: HeadingCheckboxType[]): HeadingCheckboxType[] =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          childrens: deleteData(item.childrens),
        }));

    setAcademicData((prevData) => deleteData(prevData));
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputOn, setInputOn] = useState(false);

  useEffect(() => {
    if (inputRef.current && inputOn) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [inputOn]);

  const [editableCheckboxId, setEditableCheckboxId] = useState<number | null>(
    null
  );

  const renderData = (items: HeadingCheckboxType[]) => {
    return items.map((item, index) => {
      if (item.type === 'heading') {
        return (
          <div key={item.id} className="">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold">{item.name}</div>
              <Button
                onClick={() => handleAddCheckbox(item.id)}
                variant="outline"
                size="sm"
              >
                <Plus />
              </Button>
            </div>
            {item.childrens && item.childrens.length > 0 && (
              <div className="pl-4">{renderData(item.childrens)}</div>
            )}
          </div>
        );
      }

      if (item.type === 'checkbox') {
        const checkboxId = `checkbox-${item.id}`;

        return (
          <div key={item.id} className="flex items-center space-x-2 my-2">
            <Checkbox
              id={checkboxId}
              checked={item.checked}
              onClick={() => toggleCheckbox(item.id)}
            />
            <Input
              ref={inputOn && index === 0 ? inputRef : null}
              value={item.name}
              onBlur={() => {
                setEditableCheckboxId(null);
                setInputOn(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditableCheckboxId(null); // Exit edit mode on Enter
                  inputRef.current?.blur(); // Remove focus
                }
              }}
              onClick={() => setEditableCheckboxId(item.id)} // Enter edit mode on double-click
              onChange={(e) => handleCheckboxNameChange(e, item.id)}
              className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                editableCheckboxId !== item.id
                  ? 'cursor-pointer bg-transparent border-none focus:ring-0 shadow-none'
                  : ''
              }`}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCheckboxDelete(item.id)}
            >
              <Trash />
            </Button>
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div className="tasks w-full border border-[#e5e7eb] shadow-sm rounded-lg p-6">
      {renderData(academicData)}
    </div>
  );
};

export default AcademicData;
