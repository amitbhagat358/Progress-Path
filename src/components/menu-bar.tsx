"use client";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Save,
  SaveIcon,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { BubbleMenu, Editor } from "@tiptap/react";
import { Button } from "./ui/button";
import useSaveShortcut from "@/hooks/use-save-shortcut";
import { ImageEditDialog } from "@/app/journal/[year]/[month]/[date]/components/image/image-edit-dialog";
import { LinkEditPopover } from "@/app/journal/[year]/[month]/[date]/components/link/link-edit-popover";
import { MdHorizontalRule } from "react-icons/md";

export default function MenuBar({
  editor,
  handleSave,
}: {
  editor: Editor | null;
  handleSave: () => void;
}) {
  useSaveShortcut(handleSave);

  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Underline className="size-4" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      pressed: editor.isActive("underline"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("codeBlock"),
    },
  ];

  return (
    <>
      {editor && (
        // <BubbleMenu
        //   editor={editor}
        //   tippyOptions={{ duration: 100, maxWidth: "1000px" }}
        // >
        <div className="z-10 flex justify-center sticky top-0 py-2">
          <div className="border p-2 rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {Options.map((option, index) => (
              <Toggle
                key={index}
                pressed={option.pressed}
                onPressedChange={option.onClick}
              >
                {option.icon}
              </Toggle>
            ))}
            <Button
              variant="ghost"
              className="px-3"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <MdHorizontalRule />
            </Button>
            <LinkEditPopover editor={editor} size="sm" />
            <ImageEditDialog editor={editor} size="sm" />
            <Button variant="ghost" onClick={handleSave} className="px-3">
              <SaveIcon />
            </Button>
          </div>
        </div>
        // </BubbleMenu>
      )}
    </>
  );
}
