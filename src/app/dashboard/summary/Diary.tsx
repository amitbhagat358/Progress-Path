import { AutosizeTextarea } from '@/components/ui/textarea';
import { useDiary } from './context/DiaryContext';
import { Dispatch, SetStateAction } from 'react';

interface DiaryProps {
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}

const Diary: React.FC<DiaryProps> = ({ setUnsavedChanges }) => {
  const { diaryContent, setDiaryContent } = useDiary();
  return (
    <div className="w-full p-6 flex flex-col gap-10 border border-[#e3e3e7] shadow-sm rounded-lg h-full">
      <div className="font-semibold text-2xl text-center"> Diary </div>

      <AutosizeTextarea
        value={diaryContent}
        placeholder="How was your day?"
        className="md:text-[16px] focus-visible:ring-0 !min-h-[300px]"
        onChange={(e) => {
          setUnsavedChanges(true);
          setDiaryContent(e.target.value);
        }}
      />
    </div>
  );
};

export default Diary;