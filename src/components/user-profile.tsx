import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
    LayoutDashboard,
    LogOut,
    Settings,
    User,
    Menu,
    X,
    LucideShoppingCart,
    Store,
    Loader,
  } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetMyProfileQuery } from "@/redux/features/user/useApi";
import { logout } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";

import Link from "next/link";
import { clearCart } from "@/redux/features/cart/cartSlice";

export const UserProfile = () => {
    const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading } = useGetMyProfileQuery(user?.id);
    const handleLogout = () => {
        dispatch(logout(undefined));
        Cookies.remove("refreshToken");
        dispatch(clearCart()); 
      };

      if(isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
              <Loader className="size-5 animate-spin text-muted-foreground" />
            </div>
          );
      }
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:mr-10">
            <button className="flex  items-center justify-center p-1 rounded-full cursor-pointer">
              <div className="w-10 h-10 rounded-full overflow-hidden ">
                <Image
                  alt="profile"
                  src={data?.data?.profilePhoto || "/image/avatar.png"}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white shadow-lg text-black mr-10">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user && user.role === "ADMIN" ? (
                <Link href="/dashboard/admin">
                  <DropdownMenuItem className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
              ) : user.role === "VENDOR" ? (
                <>
                  <Link href="/dashboard/vendor">
                    <DropdownMenuItem className="cursor-pointer">
                      <Store className="mr-2 h-4 w-4" />
                      <span>Vendor Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/vendor/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Vendor Settings</span>
                    </DropdownMenuItem>
                  </Link>
                </>
              ) : user.role === "CUSTOMER" ? (
                <>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/profile/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                </>
              ) : null}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login" className="flex items-center space-x-2 group mr-4 ">
          <div className="flex flex-col md:mr-5">
            <User className="h-7  mx-auto w-7 text-main group-hover:text-rose-500 transition-colors" />
            <span className="text-sm font-semibold group-hover:text-rose-500 transition-colors">
              Login
            </span>
          </div>
        </Link>
      )}
    </>
  );
};
