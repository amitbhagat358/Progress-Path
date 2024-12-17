import { AutosizeTextarea } from '@/components/ui/textarea';
import { useDiary } from './context/DiaryContext';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { marked } from 'marked';
import { Button } from '@/components/ui/button';

interface DiaryProps {
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}

const Diary: React.FC<DiaryProps> = ({ setUnsavedChanges }) => {
  const { diaryContent, setDiaryContent } = useDiary();
  const [editable, setEditable] = useState(false);

  const convertToHtml = (input: string) => marked(input);

  return (
    <div className="w-full py-5 flex flex-col gap-10 h-full">
      {editable ? (
        <div>
          <AutosizeTextarea
            value={diaryContent}
            placeholder="How was your day?"
            className="md:text-[16px] focus-visible:ring-0 !min-h-[300px]"
            onChange={(e) => {
              setUnsavedChanges(true);
              setDiaryContent(e.target.value);
            }}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={() => setEditable(!editable)}>
              {editable ? 'Ok' : 'Edit'}
            </Button>
          </div>
        </div>
      ) : null}
      <div>
        {editable && <div>Preview</div>}
        <div
          className="prose border border-[#e3e3e7] p-3 rounded-lg min-h-[100px] overflow-auto"
          dangerouslySetInnerHTML={{ __html: convertToHtml(diaryContent) }}
        ></div>
        <div className="flex justify-end">
          {!editable && (
            <Button className="mt-5" onClick={() => setEditable(!editable)}>
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diary;
