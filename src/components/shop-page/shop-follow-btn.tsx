import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useFollowingsShopMutation } from "@/redux/features/shop/shopApi";

interface IProps {
  following: boolean;
  totalFollower: number;
  shopId: string;
}

export const ShopFollowButton: React.FC<IProps> = ({
  following,
  totalFollower,
  shopId,
}) => {
  const [isFollowing, setIsFollowing] = useState(following);
  const [followerCount, setFollowerCount] = useState(totalFollower);

  const [toggleStatus, { isLoading }] = useFollowingsShopMutation();

  // Ensure local state syncs with props when they change
  useEffect(() => {
    setIsFollowing(following);
    setFollowerCount(totalFollower);
  }, [following, totalFollower]);

  const handleToggleFollowing = async () => {
    const newIsFollowing = !isFollowing;

    // Optimistically update state
    setIsFollowing(newIsFollowing);
    setFollowerCount((prev) => (newIsFollowing ? prev + 1 : prev - 1));

    try {
      // API call to toggle follow/unfollow
      await toggleStatus(shopId).unwrap();
    } catch (error) {
      console.error("Follow/Unfollow failed:", error);

      // Revert state changes if the request fails
      setIsFollowing(!newIsFollowing);
      setFollowerCount((prev) => (newIsFollowing ? prev - 1 : prev + 1));
    }
  };

  return (
    <Button
      onClick={handleToggleFollowing}
      variant={isFollowing ? "default" : "outline"}
      className={`${
        isFollowing
          ? "bg-gray-400 hover:bg-gray-400/80 "
          : "border-main  dark:bg-white dark:text-black"
      }`}
      disabled={isLoading} 
    >
      <User className="w-4 h-4" />
      {isLoading
        ? isFollowing
          ? "Unfollowing..."
          : "Following..."
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </Button>
  );
};
