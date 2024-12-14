import { AutosizeTextarea } from '@/components/ui/textarea';
import { useDiary } from './context/DiaryContext';
import { Dispatch, SetStateAction } from 'react';

interface DiaryProps {
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}

const Diary: React.FC<DiaryProps> = ({ setUnsavedChanges }) => {
  const { diaryContent, setDiaryContent } = useDiary();
  return (
    <div className="w-full py-5 flex flex-col gap-10 h-full">
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
