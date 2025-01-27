"use client";

import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";

const SuccessPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
      <Confetti width={2000} height={1000} />
      <h1 className="text-6xl text-green-700">Successful</h1>
      <h2 className="text-xl font-medium">Your order has been successfully!</h2>
      <Button className="bg-rose-600">Continue Shopping</Button>
    </div>
  );
};

export default SuccessPage;
