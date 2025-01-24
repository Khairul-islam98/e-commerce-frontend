"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { TriangleAlert } from "lucide-react";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";

import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const RegisterPage = () => {
  const [createUser] = useSignupMutation();
  const dispatch = useAppDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);


  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      const formData = new FormData();

      const userInfo = {
        email: value.email,
        password: value.password,
        name: value.name,
        role: value.role,
      };

      formData.append("data", JSON.stringify(userInfo));
      if (image) {
        formData.append("image", image);
      }

      const res = await createUser(formData).unwrap();
      const user = verifyToken(res.data.accessToken) as CustomJwtPayload;
    

      dispatch(setUser({ user: user, token: res.data.accessToken }) ) 
      Cookies.set("refreshToken", res.data.refreshToken, { expires: 60 });
      setError("");
      if (user?.role === "VENDOR") {
        router.push("/dashboard/vendor");
      } else {
        router.push("/");
      }
    } catch (error) {
      if (
        (error as any).data &&
        typeof (error as any).data.message === "string"
      ) {
        setError((error as any).data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = e.target.files;
      setImage(files[0]);
    }
  };

  return (
    <section className="dark:bg-[#313338]">
      <div className="min-h-screen">
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 text-gray-900 dark:text-white">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-2xl font-bold">Sign up to continue</h1>
              <p className="text-xl font-semibold text-gray-400">
                Welcome to Shop <span className="text-rose-500">Hub</span>{" "}
              </p>
            </div>
            {!!error && (
              <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                <TriangleAlert className="w-4 h-4" />
                <p className="text-rose-700">{error}</p>
              </div>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="block mb-2 text-sm">
                    Name
                  </Label>
                  <Input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    id="name"
                    placeholder="Name"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                  {errors.name && typeof errors.name.message === "string" && (
                    <p className="text-red-500 text-sm pt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="image" className="block mb-2 text-sm">
                    Select Image:
                  </Label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                </div>
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
                      {...register("password", {
                        required: "Password is required",
                      })}
                      id="password"
                      placeholder="Password"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    />
                    <p
                      onClick={() => setIsShowPassword(!isShowPassword)}
                      className="absolute  right-2 top-1/2 transform -translate-y-1/2 cursor-pointer p-1 text-black"
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
                <Controller
                  name="role"
                  control={control}
                  defaultValue="CUSTOMER"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="User" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CUSTOMER">User</SelectItem>
                        <SelectItem value="VENDOR">Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-rose-500 w-full rounded-md py-3 text-white"
                >
                  Continue
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
              <p className="px-3 text-sm dark:text-gray-400">
                Already have an account?
              </p>
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            </div>

            <p className="px-6 text-sm text-center text-gray-400">
              <Link
                href="/login"
                className="hover:underline hover:text-rose-500 text-gray-600 font-bold text-[20px]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
