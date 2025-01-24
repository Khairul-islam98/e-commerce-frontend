"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation()
  const [isShowPassword, setIsShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const token = searchParams.get("token");
 const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

const onSubmit  = async (data: any) => {

  if (token) {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
        token: token
      }
     const res = await resetPassword(userInfo).unwrap()
    toast.success('Password reset successfully');
    } catch (error) {
      toast.error(typeof error === "string" ? error : String(error));
    }
  }
}

  return (
    <section className="dark:bg-[#313338]">
      <div className="min-h-screen">
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 text-gray-900 dark:text-white">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-2xl font-bold">Reset Password</h1>
              <p className="text-xl font-semibold text-gray-400">
              </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="block mb-2 text-sm">
                    Email address
                  </Label>
                  <Input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    id="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                   {errors.email && typeof errors.email.message === "string" && (
                    <p className="text-red-500 text-sm pt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-sm mb-2">
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      type={`${isShowPassword ? "text" : "password"}`}
                      {...register("password", { required: "Password is required" })}
                      id="password"
                      placeholder="Password"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    />
                    <p
                      onClick={() => setIsShowPassword(!isShowPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer p-1 text-black"
                    >
                      {isShowPassword ? <IoEye /> : <IoEyeOff />}
                    </p>
                    {errors.password &&
                      typeof errors.password.message === "string" && (
                        <p className="text-red-500 text-sm pt-2">
                          {errors.password.message}
                        </p>
                      )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-rose-500 w-full rounded-md py-2 text-white"
                >
                  Submit
                </button>
              </div>
              
            </form>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
              <p className="px-3 text-sm dark:text-gray-400">
                Reset Your Password
              </p>
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
