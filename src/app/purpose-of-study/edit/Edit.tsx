'use client';
import { updatePurpose } from '@/app/actions/purposeActions';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PurposeType } from '@/interfaces/purpose';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function EditPurpose({ data }: { data: PurposeType[] }) {
  const [items, setItems] = useState(data);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [newPurposeValue, setNewPurposeValue] = useState('');

  const handleInputChange = (id: number, value: string) => {
    setItems((items) =>
      items?.map((item) =>
        item.id === id ? { ...item, text: value } : { ...item }
      )
    );
    setUnsavedChanges(true);
  };

  const handleAdd = () => {
    if (newPurposeValue === '') {
      toast.error("Purpose can't be empty.");
      return;
    }
    setItems((items) => [...items, { id: Date.now(), text: newPurposeValue }]);
    setUnsavedChanges(true);
  };

  const handleDelete = (id: number) => {
    setItems((items) =>
      items?.filter((item) => (item.id === id ? null : { ...item }))
    );
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      await updatePurpose(items);
      toast.success('Purpose Updated.', { duration: 3000 });
    } catch (err) {
      toast.error('Error Updating Purpose.', {
        description: 'Try refreshing the page',
        duration: 3000,
      });
    }
    setUnsavedChanges(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [unsavedChanges]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  return (
    <div className="w-full relative">
      <Header />
      <div className="w-full flex justify-center items-center mb-10">
        <div className="w-[70%] flex justify-between">
          <div className="text-3xl border-b border-b-primary font-semibold">
            Edit
          </div>
        </div>
      </div>

      <div className="w-[70%] m-auto flex flex-col">
        {items?.map((item) => (
          <div
            key={item.id}
            className="flex justify-center items-center gap-5 p-2"
          >
            <Input
              value={item.text}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            ></Input>
            <Button variant={'outline'} onClick={() => handleDelete(item.id)}>
              <Trash />
            </Button>
          </div>
        ))}
      </div>

      <div className="w-full h-[130px] flex flex-col justify-center items-center gap-5 mt-10">
        <Input
          value={newPurposeValue}
          onChange={(e) => setNewPurposeValue(e.target.value)}
          className="w-[70%]"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
              setNewPurposeValue('');
            }
          }}
        ></Input>
        <div className="w-full flex justify-center items-center gap-5">
          <Button variant={'outline'} onClick={handleAdd}>
            Add purpose
          </Button>
          <div className="flex justify-center items-center">
            <div className="">
              {unsavedChanges && (
                <Button onClick={handleSave}>Save Changes</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
