"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import {
  useForm,
  SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";

const ForgetPassword = () => {
  const [forgetPassword] = useForgetPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    try {
    
      const res = await forgetPassword(data).unwrap()
      toast.success("Check your email for password reset link. .");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to send forget link.");
    }
  }
  return (
    <section className="dark:bg-[#313338]">
      <div className="min-h-screen">
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 text-gray-900 dark:text-white">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-2xl font-bold">Forget Password</h1>
              <p className="text-xl font-semibold text-gray-400">
              Use your email continue
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
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-rose-500 w-full rounded-md py-2 text-white"
                >
                  Submit
                </button>
              </div>
              <p>
                <Link
                  href="/login"
                  className="flex justify-center hover:underline hover:text-rose-500 text-gray-600 font-bold text-[20px]"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
