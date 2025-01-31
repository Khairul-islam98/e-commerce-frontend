
import { Eye, ShoppingBasket, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { GoGitCompare } from "react-icons/go";

import { IProduct } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { addToComparison } from "@/redux/features/product/productSlice";

interface IProps {
  product: IProduct;
  onAddToCart: () => void;
}

export const ProductToolTip: React.FC<IProps> = ({ product, onAddToCart }) => {
  const dispatch = useAppDispatch();
  const addToCompare = () => {
    dispatch(addToComparison(product));
  };

 
  return (
    <>
      <div
        className="z-20  left-0 backdrop-blur-sm w-full h-full center  group-hover/image:top-0 overflow-hidden dark:text-white"
       
      >
        <div className="flex items-center justify-center border-[1px] border-primaryMat bg-white rounded-[3px] overflow-hidden p-[5px]">
          <button
            className="p-[5px] border-x-[1px] border-borderColor dark:text-[#313338] hover:bg-[#f0f0f0]"
            onClick={() => {}}
          >
            <ShoppingBasket className="w-[50px] " />
          </button>
          <button
            className="p-[5px] border-x-[1px] border-borderColor dark:text-[#313338] hover:bg-[#f0f0f0]"
            onClick={onAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-[50px] " />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="p-[5px] border-r-[1px] border-borderColor dark:text-[#313338]  hover:bg-[#f0f0f0]"
          >
            <Eye className="w-[50px]" />
          </Link>
          <button
            onClick={addToCompare}
            className="p-[5px] border-r-[1px] border-borderColor dark:text-[#313338] hover:bg-[#f0f0f0]"
          >
            <GoGitCompare className="w-[50px]" />
          </button>
          
        </div>
      </div>
    </>
  );
};


