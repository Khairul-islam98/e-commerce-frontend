"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/hooks";

const Dashboard = () => {
  const router = useRouter();
  const { user, token } = useAppSelector((state) => state.auth);
  useEffect(() => {
  
    if (!user || !token) {
      router.push("/login");
      Cookies.set("redirect", "/dashboard");
      return;
    }
    if (user.role === "CUSTOMER") {
      router.replace("/");
    } else {
      router.replace(`/dashboard/${user.role.toLowerCase()}`);
    }
  }, [user, router, token]);
  return <div></div>;
};

export default Dashboard;
