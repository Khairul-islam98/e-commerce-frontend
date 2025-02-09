
import { IProduct } from "@/types";
import { ProductCard } from "../all-products/product-card";
import { ProductSkeleton } from "../skeleton/product-skeleton";
import { Separator } from "../ui/separator";

interface IProps {
  products: IProduct[];
  isLoading: boolean;
}

export const ShopProduct = ({ products, isLoading }: IProps) => {
  return (
    <div className="w-full">
      <h4 className="text-[25px] font-[700] text-mainTxt">Latest from Shop</h4>
      <Separator className="my-[25px]" />
      <div className="gridView gap-[15px]">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}

        {isLoading && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
      </div>
    </div>
  );
};


