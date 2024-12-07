import { ISideBarState } from "@/app/(dashboard)/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMyProfileQuery } from "@/redux/features/user/useApi";
import { useAppSelector } from "@/redux/hooks";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMenu } from "react-icons/io5";

export const DashboardHeader = ({ setIsOpen }: ISideBarState) => {
  const { user } = useAppSelector((state) => state.auth);
  const {data} = useGetMyProfileQuery(user?.id)
  const avatarFallback = data?.data?.name?.charAt(0).toUpperCase() 
 
  return (
    <div className="w-full h-[70px] flex items-center justify-between px-[20px]  py-[10px] border-b shrink-0">
      <Link href="/">
        <Image
          width={70}
          height={50}
          src="/image/Shop.png"
          alt="logo"
          className="w-[70px] md:flex hidden"
        />
      </Link>

      <Button
        className="menuBTn flex md:hidden"
        onClick={() => setIsOpen(true)}
        variant={"ghost"}
      >
        <IoMenu />
      </Button>
      <div className="flex items-center justify-end gap-[8px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={data?.data?.profileImage} alt="user avatar" />
              <AvatarFallback>
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/"}>Home</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};


