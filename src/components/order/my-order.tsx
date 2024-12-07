import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

interface IProps {
  orders: any[];
}

export const MyOrderList: React.FC<IProps> = ({ orders }) => {
 
  return (
    <div className="w-full space-y-4">
      {orders?.map((order) => (
        <Card key={order.id} className="w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={order.shopInfo.logo || ""} alt="Shop Logo" />
                  <AvatarFallback>
                    {order.shopInfo?.name.charAt(0).toUpperCase() || "S"}
                  </AvatarFallback>
                </Avatar>
                {order.shopInfo?.name || "Unknown Shop"}
              </h3>
              <Badge variant="secondary">{order.status}</Badge>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-20 h-20 relative">
                <Image
                  src={order?.product?.image[0] || "/placeholder-image.png"}
                  alt={order.product?.name || "Product"}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{order.product?.name || "Product Name"}</h4>
                <p className="text-sm text-muted-foreground">
                  Color: {order.color || "N/A"}, Size: {order.size || "N/A"}
                </p>
                <div className="flex items-center gap-8 mt-2">
                  <span className="font-medium">
                    $ {order.totalAmount?.toFixed(2) || "0.00"}
                  </span>
                  <span className="text-muted-foreground">
                    Qty: {order.quantity || 0}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {/* Placeholder for future actions */}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};


