import * as React from "react";
import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { imageUpload } from "@/app/actions/image-upload-actions";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

interface ImageEditBlockProps {
  editor: Editor;
  close: () => void;
}

export const ImageEditBlock: React.FC<ImageEditBlockProps> = ({
  editor,
  close,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [link, setLink] = React.useState("");

  const handleClick = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFile = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      close();

      await toast.promise(imageUpload(formData), {
        loading: (
          <div className="flex items-center gap-2 text-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading image...</span>
          </div>
        ),
        success: (res) => {
          if (res.message !== "success" || !res?.imgUrl) {
            throw new Error("Image upload failed");
          }
          editor.commands.setImage({ src: res.imgUrl });
          return (
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Image uploaded successfully.</span>
            </div>
          );
        },
        error: (
          <div className="flex items-center gap-2 text-foreground">
            <XCircle className="h-4 w-4 text-red-500" />
            <span>Error uploading image</span>
          </div>
        ),
      });
    },
    [editor, close]
  );
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (link) {
        editor.commands.setImage({ src: link });
        close();
      }
    },
    [editor, link, close]
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="image-link">Attach an image link</Label>
        <div className="flex">
          <Input
            id="image-link"
            type="url"
            required
            placeholder="https://example.com"
            value={link}
            className="grow"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
          />
          <Button onClick={handleSubmit} type="button" className="ml-2">
            Submit
          </Button>
        </div>
      </div>
      <Button type="button" className="w-full" onClick={handleClick}>
        Upload from your computer
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        multiple
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};

export default ImageEditBlock;
