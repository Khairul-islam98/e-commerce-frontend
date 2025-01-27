/* eslint-disable react-hooks/exhaustive-deps */

import useDebounce from "@/hooks/use-debounce";
import { Search as SearchItem } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface IProps {
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  debounceTimeOut?: number;
}
export const Search: React.FC<IProps> = ({
  onValueChange,
  className,
  debounceTimeOut,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceValue, setDebounceValue] = useDebounce("", debounceTimeOut);

  useEffect(() => {
    onValueChange(debounceValue);
  }, [debounceValue]);

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
      className={`w-[500px] flex items-start md:items-center flex-col md:flex-row gap-[5px] ${
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
        <Button onClick={handleSerch} className="bg-rose-600 text-white hover:bg-rose-700">
          <SearchItem size={20} />
        </Button>
      )}
    </div>
  );
};


