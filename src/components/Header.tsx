import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <div className="w-full flex justify-between p-3 mb-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
      <div className="flex items-center gap-5">
        <SidebarTrigger />
      </div>
      <div className="md:w-full md:ml-10 flex items-center text-2xl font-bold">
        <Link href={"/"}>Progress Path</Link>
      </div>
      <div className="flex justify-end items-center gap-10 ">
        <ModeToggle />
      </div>
    </div>
  );
}
