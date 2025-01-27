"use client";

import { useAppSelector } from "@/redux/hooks";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

type TRole = "ADMIN" | "VENDOR" | "CUSTOMER";

interface IProps {
  role: TRole | "*";
  children: React.ReactNode;
}

const Protectedroute: React.FC<IProps> = ({ role, children }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const path = usePathname();

 

  if (!user || !token) {
    Cookies.set("redirect", path);
    router.push("/login");
    return <></>;
  }

  if (user.role !== role && role !== "*") {
    router.push("/");
    return <></>;
  }

  return children;
};

export default Protectedroute;
