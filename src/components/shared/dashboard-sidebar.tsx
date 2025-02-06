"use client";
import { cn } from "@/lib/utils";


import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import { SetStateAction, useEffect } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { DashboardNavbar } from "./dashboard-navbar";
import { adminLinks, vendorLinks } from "@/types/dashboardtype";

type SidebarProps = {
  className?: string;
  setIsopen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function DashboardSidebar({
  className,
  isOpen,
  setIsopen,
}: SidebarProps) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {

      const target = event.target as HTMLElement;

      const screen = window.screen.width;

 
      if (screen > 1024) {
        return;
      }


      if (target.closest(".sidebar") || target.closest(".menuBTn")) {
        return;
      }

      setIsopen(false);
    };

    // hide sidebar on clicking outside
    if (isOpen) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsopen]);

  const toggleStyle = {
    left: isOpen ? "277px" : "10px",
    rotate: isOpen ? "0deg" : "180deg",
  };

  const handleCloseBar = () => {
    const width = window.screen.width;

    width > 767 ? "" : setIsopen(false);
  };

  const handleLogout = () => {
    dispatch(logout(undefined));
    Cookies.remove("refreshToken");
    dispatch(clearCart())
  };

  

  return (
    <aside
      style={{
        transition: "0.3s",
        width: `${isOpen ? "287px" : "0px"}`,
        display: "flex",
      }}
      className={cn(
        `md:relative fixed top-0 left-0   h-full border-r bg-card transition-[width] duration-500 md:block
        w-72 shrink-0 overflow-hidden z-[30] dark:text-black  sidebar flex flex-col gap-[20px] justify-between pb-[20px] bg-white md:bg-transparent`,
        className
      )}
    >
      <div className="w-full">
        <ChevronLeft
          className={cn(
            "fixed z-20 top-[40%] dark:text-black cursor-pointer rounded-full border bg-background text-3xl text-foreground md:flex hidden bg-white"
          )}
          style={{
            transition: "0.3s",
            ...toggleStyle,
          }}
          onClick={() => setIsopen(!isOpen)}
        />

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1" onClick={handleCloseBar}>
              <DashboardNavbar
                navLinks={
                  user ? (user.role == "ADMIN" ? adminLinks : vendorLinks) : []
                }
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        className="w-[90%] mx-auto bg-rose-500 text-white"
        
      >
        Logout
      </Button>
    </aside>
  );
}
