"use client";

import { useGetMyShopQuery } from "@/redux/features/shop/shopApi";
import { useAppSelector } from "@/redux/hooks";
import { ShopForm } from "./shop-from";


export const EditMyShop = () => {
  const {user} = useAppSelector(state => state.auth);
  const { data } = useGetMyShopQuery(user?.id);

  return <ShopForm initialValues={data?.data} />;
};


