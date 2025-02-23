"use client";



import { useGetMyShopQuery } from "@/redux/features/shop/shopApi";
import { MyShopCard } from "./my-shop-card";
import { useAppSelector } from "@/redux/hooks";
import { ShopForm } from "./shop-from";

export const MyShopOverview = () => {
 const {user} = useAppSelector(state => state.auth);
  const { data } = useGetMyShopQuery(user?.id);
   
  return (
    <div>
      {data?.data ? (
        <MyShopCard shop={data?.data! || {}} />
      ) : (
        <ShopForm /> 
      )}
    </div>
  );
};


