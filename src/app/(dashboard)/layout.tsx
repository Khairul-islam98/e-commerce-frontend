"use client";


import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/components/loader";
import DashboardSidebar from "@/components/shared/dashboard-sidebar";
import { DashboardHeader } from "@/components/shared/dashboard-header";

export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const { user, token } = useAppSelector((state) => state.auth);



  return (
    <div className="w-full h-dvh flex flex-col items-start justify-start">
      <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full h-[calc(100%-70px)] flex items-start justify-start">
        <DashboardSidebar isOpen={isOpen} setIsopen={setIsOpen} />
        <div className="h-full w-full overflow-auto smoothBar p-[50px] bg-[#f3f3f3]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
