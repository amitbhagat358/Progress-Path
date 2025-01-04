import Link from 'next/link';
import { ModeToggle } from './ui/mode-toggle';

export function Header() {
  return (
    <div className="w-full flex justify-between items-center p-4 mb-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
      <div className="text-2xl font-bold pl-20">
        <Link href={'/'}>Progress Path</Link>
      </div>
      <div className="flex justify-end items-center gap-10 pr-20">
        <ModeToggle />
      </div>
    </div>
  );
}
