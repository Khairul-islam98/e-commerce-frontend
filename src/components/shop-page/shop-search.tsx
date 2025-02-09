/* eslint-disable react-hooks/exhaustive-deps */

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/use-debounce";
interface IProps {
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  debounceTimeOut?: number;
}
export const ShopSearch = ({
  onValueChange,
  className,
  debounceTimeOut,
  placeholder,
}: IProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceValue, setDebounceValue] = useDebounce("", debounceTimeOut);

  useEffect(() => {
    onValueChange(debounceValue);
  }, []);

  const handleSerch = () => {
    onValueChange(searchTerm);
  };

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.keyCode;
    const value = e.currentTarget.value;
    if (debounceTimeOut === undefined) {
      if (keyCode === 13) {
        onValueChange(value);
      }
      setSearchTerm(value);
    } else {
      setDebounceValue(value);
    }
  };

  return (
    <div
      className={`md:w-[500px] mx-auto  flex md:items-center flex-col md:flex-row gap-[5px] ${
        className || ""
      }`}
    >
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        onKeyUp={handleChange}
        onBlur={debounceValue ? undefined : handleSerch}
        className="w-full"
      />
      {debounceTimeOut ? null : (
        <Button onClick={handleSerch} className="">
          <Search size={20} />
        </Button>
      )}
    </div>
  );
};


