/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { ICategoryInfo, IProduct } from "@/types";
import { ArrowLeft, ImagePlus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import { Heading } from "../heading";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import {
  useGetPrductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hooks";

export const UpdateProduct = () => {
  const productId = useParams().productId as string;
  const router = useRouter();

  const { data } = useGetPrductByIdQuery(productId);
  const { data: categories } = useGetAllCategoriesQuery({});
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;

  const [product, setProduct] = useState<IProduct | null>(null);
  const [image, setImage] = useState<File | File[] | null>(null);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [colors, setColors] = useState<{ name: string; value: string }[]>([]);
  const [sizes, setSizes] = useState<{ name: string; value: string }[]>([]);

  const [coupons, setCoupons] = useState<
    Array<{
      id?: string;
      code: string;
      discountType: string;
      discountValue: number;
      isActive: boolean;
      minimumSpend?: number;
    }>
  >([]);

  useEffect(() => {
    if (data?.data) {
      setProduct(data.data);
      setCoupons(data.data.coupon || []);
      setColors(data.data.colors || []);
      setSizes(data.data.sizes || []);
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevState) =>
      prevState ? { ...prevState, [name]: value } : null
    );
  };

  const handleCategoryChange = (value: string) => {
    setProduct((prevState) =>
      prevState ? { ...prevState, categoryId: value } : null
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);

      // Combine new files with existing images (if any)
      setImage((prev) => {
        const currentImages = Array.isArray(prev) ? prev : prev ? [prev] : [];
        return [...currentImages, ...uploadedFiles];
      });
    }
  };

  const handleImageRemoval = (index: number, isNewImage: boolean) => {
    if (isNewImage) {
      // Remove from newly uploaded images (state: image)
      setImage((prevImage) =>
        Array.isArray(prevImage)
          ? prevImage.filter((_, i) => i !== index)
          : null
      );
    } else {
      // Remove from existing images (state: product.image)
      setProduct((prevProduct) => {
        if (!prevProduct) return null;

        const updatedImages = Array.isArray(prevProduct.image)
          ? prevProduct.image.filter((_, i) => i !== index)
          : prevProduct.image !== undefined
          ? [] // Ensure we don't keep an undefined value
          : [];

        // Track the index of the removed image for backend handling
        const removedImageIndex = prevProduct.image ? index : null;
        if (removedImageIndex !== null) {
          setRemovedImages((prev) => [...prev, removedImageIndex.toString()]); // Store the index of the removed image
        }

        const formData = new FormData();
        const payload = {
          removeImageIndex: Number(removedImageIndex),
        };
        formData.append("data", JSON.stringify(payload));

        // Make the API request
        const res = updateProduct({
          payload: formData,
          id: productId,
          userId,
        }).unwrap();

        return {
          ...prevProduct,
          image: updatedImages,
        };
      });
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();

      const {
        name,
        price,
        discount,
        description,
        categoryId,
        stock,
        image: existingImage,
      } = product!;

      // Combine old and new images
      const originalImages = Array.isArray(existingImage)
        ? existingImage
        : existingImage
        ? [existingImage]
        : [];
      const currentImages = Array.isArray(image) ? image : image ? [image] : [];

      // Prepare payload
      const payload: any = {
        name,
        price: Number(price),
        discount: Number(discount),
        description,
        categoryId,
        stock: Number(stock),
        image: [...originalImages, ...currentImages],
        coupons,
        colors,
        sizes,
      };

      // Add the JSON stringified payload to the formData
      formData.append("data", JSON.stringify(payload));

      // Handle new file uploads
      if (image) {
        if (Array.isArray(image)) {
          image.forEach((file) => formData.append("image", file));
        } else {
          formData.append("image", image);
        }
      }

      // Call the API
      const result = await updateProduct({
        payload: formData,
        id: productId,
        userId,
      }).unwrap();

      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  const handleAddColor = () => {
    setColors([...colors, { name: "", value: "" }]);
  };

  const handleRemoveColor = (index: number) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const handleAddSize = () => {
    setSizes([...sizes, { name: "", value: "" }]);
  };

  const handleRemoveSize = (index: number) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <Heading
        title="Update Product"
        description="Updating your existing product"
        className="mb-5 text-center"
      />

      <Link
        href="/dashboard/vendor/manage-products"
        className="flex items-center mb-5 gap-2 text-lg text-rose-600 hover:text-rose-700"
      >
        <ArrowLeft className="h-6 w-6" /> Go Back
      </Link>
      <div>
        <div className="relative mx-auto w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center transition hover:border-rose-600 hover:bg-blue-50 group">
          <input
            type="file"
            multiple
            accept="image/*"
            required
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center">
            <ImagePlus
              className="text-gray-400 group-hover:text-rose-600"
              size={48}
            />
            <span className="text-gray-500 mt-2 text-sm group-hover:text-rose-600">
              Upload Image
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center mb-5 gap-4 flex-wrap">
          {/* Display existing product images */}
          {product?.image &&
            (Array.isArray(product.image)
              ? product.image
              : [product.image]
            ).map((img, index) => (
              <div key={`existing-${index}`} className="relative">
                <img
                  src={img}
                  alt={`Existing Product Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
                  onClick={() => handleImageRemoval(index, false)} // Remove from existing images
                >
                  X
                </button>
              </div>
            ))}

          {/* Display newly uploaded images */}
          {image &&
            (Array.isArray(image) ? image : [image]).map((img, index) => (
              <div key={`uploaded-${index}`} className="relative">
                <img
                  src={img instanceof File ? URL.createObjectURL(img) : img}
                  alt={`Uploaded Product Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
                  onClick={() => handleImageRemoval(index, true)} // Remove from newly uploaded images
                >
                  X
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-medium">
                Product Name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                placeholder="Enter product name"
                value={product?.name || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                name="price"
                id="price"
                type="number"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                placeholder="Enter product price"
                value={product?.price || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="discount" className="block text-sm font-medium">
                Discount
              </label>
              <input
                name="discount"
                id="discount"
                type="number"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                placeholder="Enter discount (optional)"
                value={product?.discount || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium">
                Category
              </label>
              <Select
                value={product?.categoryId || ""}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.data?.map((category: ICategoryInfo) => (
                    <SelectItem key={category.id} value={category.id as string}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                placeholder="Enter product description"
                value={product?.description || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="stock" className="block text-sm font-medium">
                Stock
              </label>
              <input
                name="stock"
                id="stock"
                type="number"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                placeholder="Enter stock quantity"
                value={product?.stock || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Product Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Colors
              </label>
              <div className="space-y-4">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Color name"
                      value={color.name}
                      onChange={(e) => {
                        const updatedColors = [...colors];
                        updatedColors[index].name = e.target.value;
                        setColors(updatedColors);
                      }}
                      className="flex-1 min-w-[150px] p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-600"
                    />
                    <input
                      type="color"
                      value={color.value}
                      onChange={(e) => {
                        const updatedColors = [...colors];
                        updatedColors[index].value = e.target.value;
                        setColors(updatedColors);
                      }}
                      className="w-12 h-12 rounded-full cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddColor}
                className="mt-4 px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 focus:ring-2 focus:ring-rose-600"
              >
                Add Color
              </button>
            </div>

            {/* Product Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Sizes
              </label>
              <div className="space-y-4">
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Size name"
                      value={size.name}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].name = e.target.value;
                        setSizes(updatedSizes);
                      }}
                      className="flex-1 min-w-[150px] p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-600"
                    />
                    <input
                      type="text"
                      placeholder="(e.g., S, M, L)"
                      value={size.value}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].value = e.target.value;
                        setSizes(updatedSizes);
                      }}
                      className="w-32 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-600"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                      className="mt-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddSize}
                className="mt-4 px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 focus:ring-2 focus:ring-rose-600"
              >
                Add Size
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Manage Coupons</h3>
            {coupons.map((coupon, index) => (
              <div key={index} className="flex flex-wrap gap-4 items-center">
                <input
                  type="text"
                  className="p-3 border rounded-lg w-full sm:w-36"
                  placeholder="Code"
                  value={coupon.code || ""}
                  onChange={(e) =>
                    setCoupons((prev) =>
                      prev.map((c, i) =>
                        i === index ? { ...c, code: e.target.value } : c
                      )
                    )
                  }
                />
                <select
                  className="p-3 border rounded-lg w-full sm:w-auto"
                  value={coupon.discountType || "percentage"}
                  onChange={(e) =>
                    setCoupons((prev) =>
                      prev.map((c, i) =>
                        i === index ? { ...c, discountType: e.target.value } : c
                      )
                    )
                  }
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
                <input
                  type="text"
                  className="p-3 border rounded-lg w-full sm:w-36"
                  placeholder="Value"
                  value={coupon.discountValue || 0}
                  onChange={(e) =>
                    setCoupons((prev) =>
                      prev.map((c, i) =>
                        i === index
                          ? { ...c, discountValue: Number(e.target.value) }
                          : c
                      )
                    )
                  }
                />
                <input
                  type="text"
                  className="p-3 border rounded-lg w-full sm:w-36"
                  placeholder="Minimum Spend"
                  defaultValue={coupon.minimumSpend}
                  value={coupon.minimumSpend ?? ""}
                  onChange={(e) =>
                    setCoupons((prev) =>
                      prev.map((c, i) =>
                        i === index
                          ? { ...c, minimumSpend: Number(e.target.value) }
                          : c
                      )
                    )
                  }
                />
                <input
                  type="checkbox"
                  className="p-3"
                  checked={coupon.isActive ?? true}
                  onChange={(e) =>
                    setCoupons((prev) =>
                      prev.map((c, i) =>
                        i === index ? { ...c, isActive: e.target.checked } : c
                      )
                    )
                  }
                />
                <button
                  type="button"
                  className="p-3 text-red-600"
                  onClick={() =>
                    setCoupons((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </button>
              </div>
            ))}
            <Button
              type="button"
              className="mt-2 p-3 bg-rose-600 text-white hover:bg-rose-700"
              onClick={() =>
                setCoupons((prev) => [
                  ...prev,
                  {
                    code: "",
                    discountType: "percentage",
                    discountValue: 0,
                    isActive: true,
                    minimumSpend: undefined,
                  },
                ])
              }
            >
              Add Coupon
            </Button>
          </div>
        </div>

        <Button
          onClick={handleUpdateProduct}
          className="w-full bg-rose-600 text-white py-3 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin mx-auto" />
          ) : (
            "Update Product"
          )}
        </Button>
      </div>
    </div>
  );
};
