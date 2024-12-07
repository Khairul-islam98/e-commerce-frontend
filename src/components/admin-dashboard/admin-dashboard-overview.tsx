"use client";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CreditCard, ShoppingBag, Store, Users } from "lucide-react";

export const AdminDashboardOverview = () => {
  const { data } = useGetSystemOverviewQuery(undefined);
  console.log(data);

  const cards = [
    { title: "Active Users", value: data?.data?.totalActiveUser, icon: Users },
    {
      title: "Active Vendors",
      value: data?.data?.totalActiveVendor,
      icon: Store,
    },
    {
      title: "Active Shops",
      value: data?.data?.totalActiveShop,
      icon: ShoppingBag,
    },
    {
      title: "Total Payments",
      value: data?.data?.totalPayment,
      icon: CreditCard,
    },
  ];
  return (
    <div className=" p-4">
      <h1 className="text-2xl font-bold mb-6">System Overview</h1>
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
      {/* <TransactionChart /> */}
    </div>
  );
};


