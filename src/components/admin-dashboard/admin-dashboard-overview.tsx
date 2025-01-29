"use client";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOverviewQuery } from "@/redux/features/user/useApi";

import { Store, User2 } from "lucide-react";
import { TransactionOverviewChart } from "./transactions-overview-chart";
import { FaShop, FaCreditCard } from "react-icons/fa6";
import { ReviewOverviewChart } from "./review-overview-chart";

export const AdminDashboardOverview = () => {
  const { data } = useGetOverviewQuery(undefined);
 

  const cards = [
    { title: "Users", value: data?.data?.totalUsers, icon: User2 },
    {
      title: "Vendors",
      value: data?.data?.totalVendors,
      icon: Store,
    },
    {
      title: "Shops",
      value: data?.data?.totalShops,
      icon: FaShop,
    },
    {
      title: "Total Payments",
      value: data?.data?.totalPayments,
      icon: FaCreditCard,
    },
  ];
  return (
    <div className=" p-4">
      <h1 className="text-2xl font-bold mb-6">System <span className="text-rose-300 italic">Overview</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <Card className="cursor-pointer hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {card.value?.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <TransactionOverviewChart />
      <ReviewOverviewChart />
    </div>
  );
};


