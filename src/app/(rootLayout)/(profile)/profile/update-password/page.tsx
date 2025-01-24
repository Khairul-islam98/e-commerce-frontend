"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { toast } from "sonner";

const SecurityPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  // Mutations
  const [resetPassword, { isLoading }] = useChangePasswordMutation();

  // State for form inputs
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Reset error on change
    if (value.trim() !== "") {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors: typeof formErrors = {
      oldPassword: "",
      newPassword: "",
    };

    if (!formValues.oldPassword.trim()) {
      errors.oldPassword = "Current password is required.";
    }
    if (!formValues.newPassword.trim()) {
      errors.newPassword = "New password is required.";
    } else if (formValues.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 8 characters long.";
    }

    setFormErrors(errors);

    // Return true if no errors
    return Object.values(errors).every((err) => err === "");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const toastId = toast.loading("Updating password...");

    try {
      const data = await resetPassword({
        oldPassword: formValues.oldPassword,
        newPassword: formValues.newPassword,
      }).unwrap();

      toast.success("Password updated successfully.");
      setFormValues({ oldPassword: "", newPassword: "" });
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Something went wrong while updating your password.";
      toast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 border rounded-md shadow-sm mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">
        Update Your Login Credentials
      </h1>
      <form onSubmit={onSubmit}>
        {/* Current Password */}
        <div className="mb-6">
          <Label htmlFor="oldPassword" className="block mb-1 text-gray-600">
            Current Password *
          </Label>
          <Input
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={formValues.oldPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
            className="block w-full px-4 py-2 border rounded-md focus:ring-main focus:border-main"
          />
          {formErrors.oldPassword && (
            <p className="text-sm text-red-500 mt-1">{formErrors.oldPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-6">
          <Label htmlFor="newPassword" className="block mb-1 text-gray-600">
            New Password *
          </Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formValues.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
            className="block w-full px-4 py-2 border rounded-md focus:ring-main focus:border-main"
          />
          {formErrors.newPassword && (
            <p className="text-sm text-red-500 mt-1">{formErrors.newPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className={`bg-rose-600 text-white px-6 py-2 rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-main-dark"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecurityPage;
