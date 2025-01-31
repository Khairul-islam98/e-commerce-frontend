"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { IProduct } from "@/types";
import { Badge } from "../ui/badge";
import { GoGitCompare } from "react-icons/go";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeFromComparison } from "@/redux/features/product/productSlice";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const trimText = (text: string, toTrim: number) => {
  const isLarger = text.length > toTrim;
  return isLarger ? text.substring(0, toTrim) + "..." : text;
};

export const getFallbackText = (text: string = "", toTrim: number) => {
  return text.substring(0, toTrim || 2);
};

export const ProductComparison = () => {
  const { products } = useAppSelector((state) => state.productComparison);
  const dispatch = useAppDispatch();

  const renderProductImages = () => (
    <TableRow>
      <TableCell>Image</TableCell>
      {products.map((product, index) => (
        <TableCell key={index}>
          {product ? (
            <Image
              src={product.image[0]}
              alt={product.name}
              width={100}
              height={100}
              className="w-[100] h-[100] object-contain rounded-md"
            />
          ) : (
            <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground">
              No product selected
            </div>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
  const renderProductDetails = () => {
    const details = [
      { label: "Name", key: "name" },
      {
        label: "Price",
        key: "price",
        format: (value: number) => `$${value.toFixed(2)}`,
      },
      {
        label: "Discount",
        key: "discount",
        format: (value: number) =>
          value > 0 ? (
            <Badge variant="destructive">{value}% OFF</Badge>
          ) : (
            "No discount"
          ),
      },
      { label: "Category", key: "categoryInfo.label" },
      { label: "Shop", key: "shopInfo.name" },
      {
        label: "Colors",
        key: "colors",
        format: (colors: IProduct["colors"]) => (
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Badge key={color.id} variant="outline">
                {color.name}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        label: "Sizes",
        key: "colors",
        format: (sizes: IProduct["sizes"]) => (
          <div className="flex flex-wrap gap-2">
            {sizes
              .flatMap((size) => size)
              .map((size) => (
                <Badge key={size.id} variant="outline">
                  {size.name}
                </Badge>
              ))}
          </div>
        ),
      },
    ];
    return details.map((detail) => (
      <TableRow key={detail.label}>
        <TableCell className="font-medium">{detail.label}</TableCell>
        {products.map((product, index) => (
          <TableCell key={index}>
            {/* @ts-ignore */}
            {product
              ? detail.format
                ? detail.format(
                    //  @ts-ignore
                    detail.key
                      .split(".")
                      //  @ts-ignore
                      .reduce((obj, key) => obj?.[key], product)
                  )
                : detail.key
                    .split(".")
                    //  @ts-ignore
                    .reduce((obj, key) => obj?.[key], product)
              : "-"}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  if (products.length < 2) {
    return (
      <button
        className="w-[50px] h-[50px] rounded-full bg-rose-500 text-white flex justify-center items-center relative"
        onClick={() => {
          toast.error("Please select at least two products to compare.", {
            description: `${products.length} product selected`,
          });
        }}
      >
        <GoGitCompare />
        <span className="absolute top-[-8px] right-[-8px] text-black w-[20px] h-[20px] rounded-full bg-white text-main flex items-center justify-center">
          {products.length}
        </span>
      </button>
    );
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-[50px] h-[50px] rounded-full bg-rose-500 text-white flex justify-center items-center relative">
            <GoGitCompare />
            <span className="absolute top-[-8px] right-[-8px] w-[20px] h-[20px] text-black rounded-full bg-white text-main flex items-center justify-center">
              {products.length}
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="min-w-[90vw] h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-[25px]">
              Product Comparison
            </DialogTitle>
            <DialogDescription>
              Compare {products.length} products
            </DialogDescription>
          </DialogHeader>
          <div className="w-full mx-auto p-4 space-y-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>

                  {products.map((product, index) => (
                    <TableHead key={index}>
                      <div className="flex items-center gap-[10px]">
                        {trimText(product?.name, 20)}
                        <button
                          onClick={() =>
                            dispatch(removeFromComparison(product.id))
                          }
                        >
                          <X />
                        </button>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderProductImages()}
                {renderProductDetails()}
              </TableBody>
            </Table>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
