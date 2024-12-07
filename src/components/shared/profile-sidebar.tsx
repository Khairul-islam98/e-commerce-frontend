"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { userProfileLinks } from "@/types/dashboardtype";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ProfileSidebar = () => {
  const path = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(undefined));
    Cookies.remove("refreshToken");
    dispatch(clearCart());
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-64 bg-white p-4 border rounded-lg shadow-sm">
      {/* Back Button */}
      <button
        className="flex items-center gap-2 text-gray-600 hover:text-main"
        onClick={handleGoBack}
        aria-label="Go Back"
      >
        <FaArrowLeft /> <span>Go Back</span>
      </button>

      {/* User Links */}
      {user &&
        userProfileLinks.map(({ Icon, href, label }, i) => (
          <Link
            key={`profile-${i}`}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              path === href
                ? "text-red-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-current={path === href ? "page" : undefined}
          >
            <Icon className="h-5 w-5" /> <span>{label}</span>
          </Link>
        ))}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-red-500 border border-red-500 rounded-lg hover:bg-red-100 transition"
        aria-label="Logout"
      >
        <CiLogout className="h-5 w-5" /> <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileSidebar;
