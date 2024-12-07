"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetMyProfileQuery } from "@/redux/features/user/useApi";
import { useAppSelector } from "@/redux/hooks";

import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { toast } from "sonner";

const SettingPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetMyProfileQuery(user?.id);
  const [profileUrl, setProfileUrl] = useState(data?.data?.profileImage || "/image/avatar.png");

  const handleImageChange = (file: File | null) => {
    if (!file) {
      console.error("Invalid file");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      setProfileUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Profile updated!");
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 dark:text-black">
      <h1 className="text-xl font-semibold mb-4">Update Information</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Profile Image */}
        <div className="flex items-center space-x-4">
          <Label
            htmlFor="image"
            className="relative group w-32 h-32 rounded-full border border-gray-300 overflow-hidden"
          >
            <Image src={profileUrl} alt="Profile" fill className="object-cover rounded-full" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition">
              <FaPen className="text-white" />
            </div>
          </Label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e.target.files?.[0]!)}
          />
          <label
            htmlFor="image"
            className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <UploadIcon className="mr-2 h-4 w-4" /> Upload
          </label>
        </div>

        {/* Name Field */}
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            defaultValue={data?.data?.name}
            className="mt-1 w-full bg-gray-100 "
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={user?.email || ""}
            readOnly
            className="mt-1 w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-rose-600 text-white w-24">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingPage;
