import { ModeToggle } from "./ui/mode-toggle";
import { Target } from "lucide-react";

export function Header() {
  return (
    <div className="flex justify-between px-10 py-4 mb-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold">Progress Path</span>
      </div>
      <div className="flex justify-end items-center gap-10 ">
        <ModeToggle />
      </div>
    </div>
  );
}
