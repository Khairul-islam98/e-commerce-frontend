"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LucideShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { ModeToggle } from "../mode-toggle";


import { UserProfile } from "../user-profile";
import { NavSearch } from "./nav-search";

export const Navbar = () => {
  const path = usePathname();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const { items } = useAppSelector((state) => state.cart);
 

 

  const navlinks = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/product" },
    { label: "Flash Sale", href: "/flash-sale" },
  ];


  return (
    <nav className="border-b border-input py-3 dark:bg-slate-200 text-rose-600">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            width={50}
            height={50}
            src="/image/Shop.png"
            alt="ferox logo"
            className="w-[50px] object-contain md:ml-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-4  border-main pl-4">
          {navlinks.map(({ label, href }, i) => (
            <li
              key={`nav-${i}`}
              className={`
                                px-3 py-1 rounded-md transition-colors 
                                ${
                                  path === href
                                    ? "bg-rose-500 text-white"
                                    : "text-mainTxt hover:bg-rose-100"
                                }
                            `}
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <NavSearch />

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <div className="hidden md:block ">
            <Link
              href={`/cart`}
              className={`w-full px-[15px] rounded-[5px] mt-[15px] flex items-center justify-between gap-[15px] text-main`}
            >
              <div className="flex items-center h-6 relative">
                <LucideShoppingCart className=" size-8 mb-2" />
                <span className="absolute text-[12px] top-[-20px] right-[-10px]  bg-rose-400 shadow-md px-[6px] py-[3px] rounded-[8px] text-white">
                  {items.length}
                </span>
              </div>
            </Link>
          </div>
          <div>
            <UserProfile />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="md:hidden flex items-center justify-center text-main hover:text-rose-500 transition-colors"
            aria-label={showMobileSidebar ? "Close Menu" : "Open Menu"}
          >
            {showMobileSidebar ? (
              <X className="size-10 text-rose-500 z-20 fixed mr-10" />
            ) : (
              <Menu className="size-10 text-red-600 z-10" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {showMobileSidebar && (
        <div className="md:hidden fixed inset-0 bg-white z-10 pt-20 dark:text-white dark:bg-[#313338]">
          <div className="layout_container">
            <ul className="space-y-4">
              {navlinks.map(({ label, href }, i) => (
                <li
                  key={`mobile-nav-${i}`}
                  className={`
                                        px-4 py-3 rounded-md text-lg 
                                        ${
                                          path === href
                                            ? "bg-rose-500 text-white"
                                            : "text-mainTxt hover:bg-rose-100"
                                        }
                                    `}
                  onClick={() => setShowMobileSidebar(false)}
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
              <Separator className="mt-[20px]" />
              <Link
                href={`/cart`}
                className={`w-full px-[15px] py-[8px] rounded-[5px] mt-[15px] flex items-center justify-between gap-[15px] text-main`}
              >
                <p className="flex items-center gap-[15px] relative ">
                  <LucideShoppingCart />
                  <span className="text-[13px] absolute left-4 mb-5 px-[5px]  font-bold bg-rose-400 shadow-md text-white rounded-full">
                    {items.length}
                  </span>
                  <span>cart</span>
                </p>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;