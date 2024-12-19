'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useUserContext } from '@/app/context/userContext';
import { logout } from '@/app/actions/auth';

const ProfileIcon = () => {
  const { logoutUser } = useUserContext();

  const handleLogout = async () => {
    // to remove userId from the localstorage
    logoutUser();

    // to remove session from the cookies
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileIcon;
