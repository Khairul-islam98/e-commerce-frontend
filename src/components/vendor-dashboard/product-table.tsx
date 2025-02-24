import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  import Link from "next/link";
  import { MdEdit } from "react-icons/md";
  import { Card, CardContent } from "../ui/card";
  import { IProduct } from "@/types";
  import { ProductDelete } from "./product-delete";
  import { DuplicateProduct } from "./duplicate-product";
import Loader from "../loader";
 // Assuming you have a Loader component
  
  const trimText = (text: string, toTrim: number) => {
    const isLarger = text.length > toTrim;
    return isLarger ? text.substring(0, toTrim) + "...": text;
  };
  
  interface IProps {
    products: IProduct[];
    isLoading: boolean;
  }
  
  export const ProductTable: React.FC<IProps> = ({ products, isLoading }) => {
    return (
      <Card className="relative">
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader /> 
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg font-semibold">
                No Products Found
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[300px]">Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <TableCell className="font-medium">
                      <p className="line-clamp-2">{trimText(product.name, 70)}</p>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-yellow-500">
                      {product.rating.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-green-500">
                      {product.discount}%
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`update-product/${product.id}`}
                          className="w-[40px] h-[40px] bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
                        >
                          <MdEdit size={20} />
                        </Link>
                        <ProductDelete
                          productId={product.id}
                          productName={product.name}
                        />
                        <DuplicateProduct productId={product.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    );
  };
  