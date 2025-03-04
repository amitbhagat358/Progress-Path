import {
  Calendar,
  Home,
  SquareCheckBig as Task,
  CalendarCheck2 as Checklist,
  Target,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Suspense } from "react";
import { NavUser } from "./NavUser";

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

export async function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mt-2 mb-2">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton asChild>
                    <Link href={item.url} prefetch>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Suspense>
          <NavUser />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
