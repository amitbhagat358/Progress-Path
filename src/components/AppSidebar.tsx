"use client";
import {
  Calendar,
  Home,
  SquareCheckBig as Task,
  CalendarCheck2 as Checklist,
  Target,
} from "lucide-react";

import { IoJournalOutline } from "react-icons/io5";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Suspense } from "react";
import { NavUser } from "./NavUser";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ui/mode-toggle";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Today's Checklist",
    url: "/checklist",
    icon: Checklist,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: Task,
  },
  {
    title: "Journals",
    url: "/journal",
    icon: IoJournalOutline,
  },
  {
    title: "Summary Calendar",
    url: "/get-summary",
    icon: Calendar,
  },
  {
    title: "Purpose of Study",
    url: "/purpose-of-study",
    icon: Target,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const path = usePathname();
  return (
    <Sidebar collapsible="icon" className="border-dashed">
      <SidebarHeader className="border-b border-dashed">
        <div className="flex justify-between items-center my-2 text-nowrap">
          {open && (
            <Link href={"/"}>
              <div className="text-xl font-semibold text-nowrap text-primary text-ellipsis">
                Progress Path
              </div>
            </Link>
          )}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger />
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block">
                Toggle Sidebar <code>(⌘ + B)</code>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col mt-5">
              <TooltipProvider delayDuration={0}>
                {items.map((item) => (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <SidebarMenuItem
                        className={`py-1 hover:bg-sidebar-accent rounded-lg ${
                          path === item.url && "bg-sidebar-accent"
                        }`}
                      >
                        <SidebarMenuButton
                          asChild
                          className="text-base text-ellipsis"
                        >
                          <Link href={item.url} prefetch={true}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="hidden md:block">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <Suspense>
          <NavUser />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
