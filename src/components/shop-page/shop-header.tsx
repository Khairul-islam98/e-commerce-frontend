
import { useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { useGetShopByIdQuery } from "@/redux/features/shop/shopApi";
import { ShopFollowButton } from "./shop-follow-btn";


interface IProps {
  shopId: string;
}

export const ShopHeader: React.FC<IProps> = ({ shopId }) => {

  const { data, isLoading } = useGetShopByIdQuery(shopId);

  const { user } = useAppSelector((state) => state.auth);

  const avatarFallback = data?.data.name.charAt(0);



  return (
    <>
      
        <Card className="border-main  border-2">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Avatar>
                  <AvatarImage src={data?.data?.logo} alt={data?.data.name} />
                  <AvatarFallback>
                    {avatarFallback || "J"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-lg font-semibold">{data?.data.name}</h1>
                <div className="text-sm text-muted-foreground">
                  <p>{data?.data?.followerCount} Followers</p>
                  <p>{data?.data?.totalProduct} Product</p>
                </div>
              </div>
            </div>
            {user?.role == "CUSTOMER" ? (
              <div className="flex items-center gap-4">
                <ShopFollowButton
                  following={data?.data?.isFollowing || false}
                  totalFollower={data?.data?.followerCount || 0}
                  shopId={shopId}
                />
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      
    </>
  );
};


