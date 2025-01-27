import { AutosizeTextarea } from "@/components/ui/textarea";
import { useDiary } from "@/app/context/DiaryContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { marked } from "marked";
import { Button } from "@/components/ui/button";

interface DiaryProps {
  setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}

const Diary: React.FC<DiaryProps> = ({ setUnsavedChanges }) => {
  const { diaryContent, setDiaryContent } = useDiary();
  const [htmlContent, setHtmlContent] = useState("");
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (diaryContent != null) {
      convertToHtml(diaryContent).then((html) => setHtmlContent(html));
    }
  }, [diaryContent]);

  const convertToHtml = async (input: string) => await marked(input);

  return (
    <div className="w-full py-5 h-full">
      <div>
        <div
          className="!w-full prose prose-custom border p-3 rounded-lg min-h-[100px] overflow-auto"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></div>
        <div className="text-primary text-sm font-bold">(M↓ enabled)</div>
        <div className="w-full flex justify-end mb-20">
          {!editable && (
            <Button className="mt-5" onClick={() => setEditable(!editable)}>
              Edit
            </Button>
          )}
        </div>
        {editable ? (
          <div className="w-full">
            <AutosizeTextarea
              value={diaryContent}
              placeholder="How was your day?"
              className="w-full md:text-[16px] focus-visible:ring-0 !min-h-[300px]"
              onChange={(e) => {
                setUnsavedChanges(true);
                setDiaryContent(e.target.value);
              }}
            />
            <div className="flex justify-end mt-4">
              <Button onClick={() => setEditable(!editable)}>
                {editable ? "Ok" : "Edit"}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Diary;
