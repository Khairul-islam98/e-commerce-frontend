"use client"

import { useGetAllShopQuery } from "@/redux/features/user/useApi";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "../search";
import { ShopTable } from "./shop-table";

export const ManageShop = () => {
    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
        isBlackListed: "",
        searchTerm: "",
      });
    
      const { data, isFetching } = useGetAllShopQuery(query);
    
    return (
        <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Shop <span className="text-rose-400 italic">Management</span></CardTitle>
        </CardHeader>
        <CardContent>
          <Search
            className="mb-4"
            placeholder="Search by shop name"
            onValueChange={(searchTerm) => {
              setQuery({ ...query, searchTerm });
            }}
          />
  
          <ShopTable isLoading={isFetching} shops={data?.data || []} />
        </CardContent>
      </Card>
    );
};

