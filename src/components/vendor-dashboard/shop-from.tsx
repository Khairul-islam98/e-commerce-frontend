"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateShopMutation } from "@/redux/features/shop/shopApi";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface IShop {
  logo: string;
  name: string;
  description: string;
}

interface ShopFormProps {
  initialValues?: IShop; // Optional initial values for editing
}

export const ShopForm: React.FC<ShopFormProps> = ({ initialValues }) => {
  const [logo, setLogo] = useState<{ url?: string; file?: File }>({
    url: initialValues?.logo || "",
    file: undefined,
  });
  const [name, setName] = useState(initialValues?.name || "");
  const [description, setDescription] = useState(initialValues?.description || "");

  const router = useRouter();
  const [updateShop, { isLoading }] = useUpdateShopMutation();

  // Handle logo change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo({ url, file });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) {
      toast.error("Please wait for the current process to complete.");
      return;
    }

    if (!name || !description) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const toastId = toast.loading("Please wait...");

    try {
      const formData = new FormData();
      const shopData = { name, description };

      formData.append("data", JSON.stringify(shopData));

      if (logo.file) {
        formData.append("image", logo.file); 
      }


      const res = await updateShop(formData);

      if (res.error) {
        const errorMessage = (res.error as any)?.data?.message || "Something went wrong.";
        throw new Error(errorMessage);
      }

      toast.success(initialValues ? "Shop updated successfully!" : "Shop created successfully!");
      router.push("/dashboard/vendor");
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="mx-auto p-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>{initialValues ? "Update Shop" : "Create Shop"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Shop Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Shop Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your shop name"
                required
              />
            </div>

            {/* Shop Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your shop"
                required
              />
            </div>

            {/* Shop Logo */}
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <Input
                id="logo"
                type="file"
                onChange={handleLogoChange}
                accept="image/*"
              />
            </div>

            {/* Logo Preview */}
            {logo.url && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Logo Preview</h3>
                <Image
                  src={logo.url}
                  alt="Shop Logo Preview"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-500" disabled={isLoading}>
              {initialValues ? "Update Shop" : "Create Shop"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
