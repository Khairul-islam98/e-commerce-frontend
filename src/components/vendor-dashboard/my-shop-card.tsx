import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Users } from "lucide-react"; // Icon for followers

interface IShopInfo {
  name: string;
  logo: string;
  description: string;
  followers: { id: string; shopId: string; userId: string }[];
  isBlacklist?: boolean; // Add the isBlacklist property
}

interface Props {
  shop: IShopInfo;
}

export const MyShopCard: React.FC<Props> = ({ shop }) => {
  const followerCount = shop?.followers?.length || 0;

  return (
    <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="relative h-[220px] bg-gradient-to-r from-green-400 to-green-500">
        {/* Shop Logo and Name */}
        <div className="absolute -bottom-14 left-6 flex items-center gap-4 z-10">
          <Avatar className="w-[100px] h-[100px] shadow-md border-2 border-white">
            <AvatarImage
              src={shop?.logo || "/placeholder-logo.png"}
              alt={shop?.name || "Shop Logo"}
            />
            <AvatarFallback className="text-[40px] bg-gray-200 text-rose-700">
              {shop?.name?.[0]?.toUpperCase() || "S"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold italic">{shop?.name || "Shop Name"}</h1>
            {/* Shop Description */}
            {shop?.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {shop.description}
              </p>
            )}
          </div>
        </div>
        {/* Blacklist Badge */}
        {shop.isBlacklist && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-sm rounded-full font-semibold">
            Blacklisted
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="pt-20 px-6 pb-6 flex flex-col gap-4">
        {/* Follower Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-medium">
              {followerCount} {followerCount === 1 ? "Follower" : "Followers"}
            </span>
          </div>
          <Link href="vendor/update-shop">
            <Button
              variant="outline"
              className="text-rose-600 border-rose-600 hover:text-rose-700 hover:border-rose-700"
            >
              Edit Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
