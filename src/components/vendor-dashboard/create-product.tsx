"use client";
import React, { useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useGetMyShopQuery } from "@/redux/features/shop/shopApi";


export const CreateProduct = () => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery({});
  const [createProduct] = useCreateProductMutation();
  const { user } = useAppSelector((state) => state.auth);
  const { data: shopData } = useGetMyShopQuery(user?.id);

  // Form State
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      if (!image) {
        toast.error("Please upload an image");
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
        rating: 5,
      };

      console.log("Selected Image:", image);

      formData.append("image", image);
      formData.append("data", JSON.stringify(productData));

      console.log([...formData]);

      const response = await createProduct(formData).unwrap();
      console.log({ response });
      toast.success("Product created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
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

  // Handler for image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Product Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Product Category
          </label>
          <select
            id="category"
            {...register("categoryId", { required: true })}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select category</option>
            {categories?.data?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm">Category is required</p>
          )}
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium">Product Colors</label>
          {colors.map((color, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Color name"
                value={color.name}
                onChange={(e) => {
                  const updatedColors = [...colors];
                  updatedColors[index].name = e.target.value;
                  setColors(updatedColors);
                }}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="color"
                value={color.value}
                onChange={(e) => {
                  const updatedColors = [...colors];
                  updatedColors[index].value = e.target.value;
                  setColors(updatedColors);
                }}
                className="w-12 h-12 rounded-full border border-gray-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveColor(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddColor}
            className="text-blue-500 mt-2"
          >
            Add Color
          </button>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium">Product Sizes</label>
          {sizes.map((size, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(e) => {
                  const updatedSizes = [...sizes];
                  updatedSizes[index].name = e.target.value;
                  setSizes(updatedSizes);
                }}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Size value (e.g., S, M, L)"
                value={size.value}
                onChange={(e) => {
                  const updatedSizes = [...sizes];
                  updatedSizes[index].value = e.target.value;
                  setSizes(updatedSizes);
                }}
                className="w-20 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveSize(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSize}
            className="text-blue-500 mt-2"
          >
            Add Size
          </button>
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
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            {...register("discount", { required: true })}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.discount && (
            <p className="text-red-500 text-sm">Discount is required</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Product Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {image && (
            <p className="text-green-500 mt-1">Image selected: {image.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;