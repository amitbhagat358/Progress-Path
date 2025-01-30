import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CheckboxType } from "@/interfaces/summary";

interface ChecklistPartProps {
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
  name: string;
  data: CheckboxType[];
  handleChange: (name: string, items: CheckboxType[]) => void;
}

const ChecklistPart: React.FC<ChecklistPartProps> = ({
  setUnsavedChanges,
  name,
  data,
  handleChange,
}) => {
  const [items, setItems] = useState(data);
  const [editableInputId, setEditableInputId] = useState<number | null>(null);
  const editableInputRef = useRef<{ [key: number]: HTMLInputElement | null }>(
    {}
  );

  useEffect(() => {
    if (editableInputId !== null && editableInputRef.current[editableInputId]) {
      editableInputRef.current[editableInputId]?.focus();
    }
  }, [editableInputId]);

  const updateItems = (updatedItems: CheckboxType[]) => {
    setItems(updatedItems);
    setUnsavedChanges(true);
    handleChange(name, updatedItems);
  };

  const toggleCheckbox = (id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    updateItems(updatedItems);
  };

  const updateItem = (id: number, newName: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, name: newName } : item
    );
    updateItems(updatedItems);
  };

  const addItem = (index: number) => {
    const newItem = { id: Date.now(), name: "", checked: false };
    const updatedItems = [...items];
    updatedItems.splice(index + 1, 0, newItem);
    updateItems(updatedItems);
    setEditableInputId(newItem.id);
  };

  const removeItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    updateItems(updatedItems);
    if (editableInputId === id) {
      setEditableInputId(null);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    item: CheckboxType
  ) => {
    if (e.key === "ArrowUp" && index > 0) {
      setEditableInputId(items[index - 1].id);
      editableInputRef.current[items[index - 1].id]?.focus();
    } else if (e.key === "ArrowDown" && index < items.length - 1) {
      setEditableInputId(items[index + 1].id);
      editableInputRef.current[items[index + 1].id]?.focus();
    } else if (e.key === "Enter") {
      addItem(index);
    } else if (e.key === "Backspace" && item.name === "") {
      e.preventDefault();
      removeItem(item.id);
      if (index > 0) {
        setEditableInputId(items[index - 1].id);
        editableInputRef.current[items[index - 1].id]?.focus();
      }
    }
  };

  return (
    <div className="tasks w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 text-base font-semibold">{name}</div>
        <Button
          onClick={() => addItem(items.length - 1)}
          variant="outline"
          size="sm"
        >
          <Plus />
        </Button>
      </div>
      {items?.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center my-1 group rounded-lg pl-4"
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
              if (editableInputRef.current)
                editableInputRef.current[item.id] = el;
            }}
            value={item.name}
            onBlur={() => setEditableInputId(null)}
            onKeyDown={(e) => handleKeyDown(e, index, item)}
            onClick={() => setEditableInputId(item.id)}
            onChange={(e) => updateItem(item.id, e.target.value)}
            className={`text-base border-none focus-visible:ring-0 shadow-none transition-all ease-in-out duration-200 ${
              editableInputId !== item.id ? "cursor-pointer" : ""
            }`}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeItem(item.id)}
            className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
          >
            <Trash />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ChecklistPart;
