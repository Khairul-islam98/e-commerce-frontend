import { FaUser, FaCreditCard } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineReviews, MdDashboard } from "react-icons/md";
import { NavItem } from ".";

import { GrServices, GrProductHunt } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import {
  RiOrderPlayFill,
  RiLockPasswordLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import { FaList, FaShoppingBag } from "react-icons/fa";

export const vendorLinks: NavItem[] = [
  {
    href: "/dashboard/vendor",
    Icon: GrServices,
    title: "My Shop",
    children: [
      {
        href: "/dashboard/vendor/update-shop",
        Icon: GrServices,
        title: "Update Shop",
      },
    ],
  },
  {
    href: "/dashboard/vendor/manage-products",
    Icon: GrProductHunt,
    title: "Manage Products",
  },
  {
    href: "/dashboard/vendor/manage-orders",
    Icon: LiaShippingFastSolid,
    title: "Manage Orders",
  },
  {
    href: "/dashboard/vendor/manage-reviews",
    Icon: MdOutlineReviews,
    title: "Manage Reviews",
  },
];

export const adminLinks: NavItem[] = [
  {
    href: "/dashboard/admin",
    Icon: MdDashboard,
    title: "Dashboard",
  },
  {
    href: "/dashboard/admin/transactions",
    Icon: FaCreditCard,
    title: "transactions",
  },
  {
    href: "/dashboard/admin/manage-user",
    Icon: FaUser,
    title: "Manage Users",
  },
  {
    href: "/dashboard/admin/manage-shops",
    Icon: FaShoppingBag,
    title: "Manage Shops",
  },
  {
    href: "/dashboard/admin/manage-categories",
    Icon: FaList,
    title: "Manage Categories",
  },
];

export const userProfileLinks = [
  {
    href: "/profile",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/profile/settings",
    label: "Account setting",
    Icon: RiUserSettingsLine,
  },
  {
    href: "/profile/update-password",
    label: "Security",
    Icon: RiLockPasswordLine,
  },
  {
    href: "/profile/my-orders",
    label: "My Orders",
    Icon: RiOrderPlayFill,
  },
];
