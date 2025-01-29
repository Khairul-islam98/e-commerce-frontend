import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateShopBlacklistMutation } from "@/redux/features/user/useApi";
import { FaSpinner } from "react-icons/fa6";
import { IShopInfo } from "@/types";
import { toast } from "sonner";
import { ShopStatusChange } from "./shop-status-change";

const trimText = (text: string, toTrim: number) => {
  const isLarger = text.length > toTrim;
  return isLarger ? text.substring(0, toTrim) + "..." : text;
};

export const getFallbackText = (text: string = "", toTrim: number) => {
  return text.substring(0, toTrim || 2);
};

export const ShopTable = ({
  shops,
  isLoading,
}: {
  shops: IShopInfo[];
  isLoading: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Shop</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops.map((shop) => (
          <TableRow key={shop.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={shop.logo} alt={shop.name} />
                  <AvatarFallback>
                    {getFallbackText(shop.name, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{shop.name}</span>
              </div>
            </TableCell>
            <TableCell className="max-w-[300px] truncate">
              {trimText(shop.description || "No description", 40)}
            </TableCell>
            <TableCell>
              {new Date(shop.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  shop.isBlacklist
                    ? "bg-destructive/10 text-destructive"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {shop.isBlacklist ? "Blacklist" : "Active"}
              </span>
            </TableCell>
            <TableCell>
              <ShopStatusChange shop={shop} />
            </TableCell>
          </TableRow>
        ))}

        {!isLoading && shops.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg font-semibold">
              No Shops Found
            </p>
          </div>
        )}
      </TableBody>
    </Table>
  );
};
