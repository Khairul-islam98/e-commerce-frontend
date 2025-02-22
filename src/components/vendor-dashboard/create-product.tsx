/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useGetMyShopQuery } from "@/redux/features/shop/shopApi";
import { ImagePlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "../loader";
import { useRouter } from "next/navigation";

export const CreateProduct = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery({});
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { user } = useAppSelector((state) => state.auth);
  const { data: shopData } = useGetMyShopQuery(user?.id);
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter()

  // Form State
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm();

  const shopId = shopData?.data?.id;

  // Local state for colors and sizes
  const [colors, setColors] = useState<{ name: string; value: string }[]>([]);
  const [sizes, setSizes] = useState<{ name: string; value: string }[]>([]);

  // State for image file
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (data: any) => {
    try {
      // Validate image

      if (images.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      const formData = new FormData();
      const productData = {
        ...data,
        stock: Number(data.stock), // Convert stock to a number
        price: Number(data.price), // Convert price to a number
        discount: Number(data.discount),
        colors,
        sizes,
        shopId,
   
      };



      images.forEach((image, index) => {
        formData.append(`image`, image);
      });
      formData.append("data", JSON.stringify(productData));



      const response = await createProduct(formData).unwrap();
      
      toast.success("Product created successfully");
      reset()
      router.refresh()
    } catch (error) {
      console.log(error)
      if ((error as any).data?.error?.status === 400) {
        toast.error('Shop is blacklisted')
      }else {
        toast.error("An unknown error occurred. Please try again later.")
      }
    }
  };

  // Handlers for colors and sizes
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages([...images, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  if (isLoading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
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

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs p-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Product name is required</p>
            )}
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Product Description
            </label>
            <textarea
              id="description"
              placeholder="Enter product description"
              {...register("description", { required: true })}
              className="w-full h-24 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>

          {/* Product Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Category
            </label>
            <Select
              onValueChange={(value) =>
                setValue("categoryId", value, { shouldValidate: true })
              }
              value={watch("categoryId")}
            >
              <SelectTrigger className="w-full  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.map((category: any) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">Category is required</p>
            )}
          </div>

          <div className="space-y-6">
            {/* Product Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Colors
              </label>
              <div className="space-y-3">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap items-center gap-3"
                  >
                    {/* Color Name Input */}
                    <input
                      type="text"
                      placeholder="Color name"
                      value={color.name}
                      onChange={(e) => {
                        const updatedColors = [...colors];
                        updatedColors[index].name = e.target.value;
                        setColors(updatedColors);
                      }}
                      className="flex-1 min-w-[150px] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600"
                    />
                    {/* Color Picker */}
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
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddColor}
                className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-rose-600"
              >
                Add Color
              </button>
            </div>

            {/* Product Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Sizes
              </label>
              <div className="space-y-3">
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap items-center gap-3"
                  >
                    {/* Size Name Input */}
                    <input
                      type="text"
                      placeholder="Size name"
                      value={size.name}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].name = e.target.value;
                        setSizes(updatedSizes);
                      }}
                      className="flex-1 min-w-[150px] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600"
                    />
                    {/* Size Value Input */}
                    <input
                      type="text"
                      placeholder="(e.g., S, M, L)"
                      value={size.value}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].value = e.target.value;
                        setSizes(updatedSizes);
                      }}
                      className="w-28 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600"
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddSize}
                className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-rose-600"
              >
                Add Size
              </button>
            </div>
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter stock"
              {...register("stock", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">Stock is required</p>
            )}
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter price"
              {...register("price", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Price is required</p>
            )}
          </div>

          {/* Discount */}
          <div>
            <label htmlFor="discount" className="block text-sm font-medium">
              Discount (%)
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Enter discount"
              {...register("discount")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={isCreating}
              className={`
                px-8 py-3 rounded-full text-white font-semibold 
                transition duration-300 ease-in-out
                ${
                  isCreating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-rose-600 hover:bg--700"
                }
              `}
            >
              {isCreating ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
