import {
  Calendar,
  Home,
  SquareCheckBig as Task,
  CalendarCheck2 as Checklist,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { NavUser } from './NavUser';
import { getUserData, getUserIdFromCookies } from '@/lib/serverUtils';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: "Today's Checklist",
    url: '/checklist',
    icon: Checklist,
  },
  {
    title: 'Tasks',
    url: '/tasks',
    icon: Task,
  },
  {
    title: 'Summary Calendar',
    url: '/dashboard/get-summary',
    icon: Calendar,
  },
];

export async function AppSidebar() {
  const userId = await getUserIdFromCookies();
  const userData = await getUserData(userId);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mt-4 mb-2">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{userId && <NavUser user={userData} />}</SidebarFooter>
    </Sidebar>
  );
}
