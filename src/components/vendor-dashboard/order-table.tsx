import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "../ui/card";
import Loader from "../loader";

interface IProps {
  orders: any[];
  isLoading: boolean;
}

const OrderTable: React.FC<IProps> = ({ orders, isLoading }) => {
  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Email</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
        
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                {order.userinfo.email}
                </TableCell>
                <TableCell>{order.product.name}</TableCell>
                <TableCell>
                  {order.color}, {order.size}, Qty: {order.quantity}
                </TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>{order.status === "PROCESSING" ? "PAID" : order.status}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              
              </TableRow>
            ))}

            {!isLoading && orders.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-600 text-lg font-semibold">
                  No Products Found
                </p>
              </div>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {isLoading ? (
        <span className="absolute top-0 right-0 w-full h-full bg-[#ffffffc2] center">
          <Loader />
        </span>
      ) : (
        ""
      )}
    </Card>
  );
};

export default OrderTable;
