"use client"
import React, { useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useGetMyShopQuery } from "@/redux/features/shop/shopApi";
import {
  ImagePlus,
} from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const CreateProduct = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery({});
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { user } = useAppSelector((state) => state.auth);
  const { data: shopData } = useGetMyShopQuery(user?.id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      stock: 1,
      price: 0,
      discount: 0
    }
  });

  const shopId = shopData?.data?.id;

  const [colors, setColors] = useState<{ name: string; value: string }[]>([]);
  const [sizes, setSizes] = useState<{ name: string; value: string }[]>([]);
  const [images, setImages] = useState<File[]>([]); // Updated to allow multiple images
  const [previewImages, setPreviewImages] = useState<string[]>([]); // Updated for multiple image previews
  const [stock, setStock] = useState(1);

  const onSubmit = async (data: any) => {
    try {
      if (images.length === 0) {
        toast.error("Please upload at least one image", {
          description: "Images are required for the product."
        });
        return;
      }

      const formData = new FormData();
      const productData = {
        ...data,
        stock: Number(data.stock),
        price: Number(data.price),
        discount: Number(data.discount), // Ensure the discount is included
        colors,
        sizes,
        shopId,
        rating: 5,
      };

      // Append each image to FormData
      images.forEach(image => formData.append("images", image));

      formData.append("data", JSON.stringify(productData));

      const response = await createProduct(formData).unwrap();
      toast.success("Product Created", {
        description: `${data.name} has been successfully added to your shop.`
      });
      
      // Reset form after successful submission
      reset();
      setColors([]);
      setSizes([]);
      setImages([]);
      setPreviewImages([]);
      setStock(1);
    } catch (error) {
      toast.error("Product Creation Failed", {
        description: "Please check your input and try again."
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);
      const filePreviews = fileArray.map(file => URL.createObjectURL(file));
      setPreviewImages(filePreviews);
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

  const renderInputField = (
    id: string, 
    label: string, 
    type: string, 
    registerOptions: any, 
    placeholder: string
  ) => (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, registerOptions)}
        className={`
          w-full px-4 py-2 rounded-lg border 
          ${errors[id] 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-indigo-500'
          }
          focus:outline-none focus:ring-2 focus:ring-opacity-50 
          transition duration-300 ease-in-out
        `}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1">
          {label} is required
        </p>
      )}
    </div>
  );

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <p>Loading categories...</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Product
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload with Preview */}
          <div className="flex flex-col items-center space-y-4">
            {previewImages.length > 0 ? (
              previewImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Preview"
                  className="w-48 h-48 object-cover rounded-lg shadow-md mb-2"
                />
              ))
            ) : (
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                <ImagePlus className="text-gray-400" size={48} />
                <span className="text-gray-500 mt-2">Upload Images</span>
              </div>
            )}
            <input
              id="image"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Main Product Details */}
          <div className="grid md:grid-cols-2 gap-4">
            {renderInputField(
              "name", 
              "Product Name", 
              "text", 
              { required: true }, 
              "Enter product name"
            )}
            
            {renderInputField(
              "price", 
              "Price", 
              "number", 
              { 
                required: true, 
                min: { value: 0, message: "Price must be positive" } 
              }, 
              "Enter price"
            )}
          </div>

          {/* Discount Field */}
          <div className="space-y-1">
            <label 
              htmlFor="discount" 
              className="block text-sm font-medium text-gray-700"
            >
              Discount (%)
            </label>
            <input
              id="discount"
              type="number"
              placeholder="Enter discount percentage"
              {...register("discount", { required: false, min: 0 })}
              className={`
                w-full px-4 py-2 rounded-lg border 
                ${errors.discount 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-indigo-500'
                }
                focus:outline-none focus:ring-2 focus:ring-opacity-50 
                transition duration-300 ease-in-out
              `}
            />
          </div>

          {/* Category Select - ShadCN Select */}
          <div className="space-y-1">
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Select {...register('categoryId', { required: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1">Category is required</p>
            )}
          </div>

          {/* Description and Category */}
          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <textarea
              id="description"
              placeholder="Describe your product"
              {...register("description", { required: true })}
              className={`
                w-full px-4 py-2 rounded-lg border min-h-[100px]
                ${errors.description 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-indigo-500'
                }
                focus:outline-none focus:ring-2 focus:ring-opacity-50 
                transition duration-300 ease-in-out
              `}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                Description is required
              </p>
            )}
          </div>

          {/* Colors and Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Colors</label>
            <button
              type="button"
              onClick={handleAddColor}
              className="mt-2 text-indigo-600 hover:text-indigo-700"
            >
              Add Color
            </button>
            <div className="mt-2">
            {colors.map((color, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Color name"
                value={color.name}
                onChange={(e) => {
                  const updatedColors = [...colors];
                  updatedColors[index].name = e.target.value;
                  setColors(updatedColors);
                }}
              />
              <Input
                type="color"
                value={color.value}
                onChange={(e) => {
                  const updatedColors = [...colors];
                  updatedColors[index].value = e.target.value;
                  setColors(updatedColors);
                }}
              />
              <Button onClick={() => handleRemoveColor(index)} variant="destructive">
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={handleAddColor} variant="outline" className="mt-2">
            Add Color
          </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sizes</label>
            <button
              type="button"
              onClick={handleAddSize}
              className="mt-2 text-indigo-600 hover:text-indigo-700"
            >
              Add Size
            </button>
            <div className="mt-2">
            {sizes.map((size, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(e) => {
                  const updatedSizes = [...sizes];
                  updatedSizes[index].name = e.target.value;
                  setSizes(updatedSizes);
                }}
              />
              <Input
                type="text"
                placeholder="Size value (e.g., S, M, L)"
                value={size.value}
                onChange={(e) => {
                  const updatedSizes = [...sizes];
                  updatedSizes[index].value = e.target.value;
                  setSizes(updatedSizes);
                }}
              />
              <Button onClick={() => handleRemoveSize(index)} variant="destructive">
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={handleAddSize} variant="outline" className="mt-2">
            Add Size
          </Button>
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              min="1"
              className="w-full px-4 py-2 rounded-lg border focus:border-indigo-500 focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out"
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
                ${isCreating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
                }
              `}
            >
              {isCreating ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

