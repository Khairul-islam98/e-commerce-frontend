"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDebounce from "@/hooks/use-debounce";
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Search } from "lucide-react";
import { CategoryTable } from "./category-table";
import { Label } from "../ui/label";
import { FaSpinner } from "react-icons/fa6";

export const ManageCategory = () => {
  const onValueChange = (value: string) => {
    setQuery((prev) => ({ ...prev, searchTerm: value }));
  };
  const [query, setQuery] = useState({
    page: 1,
    searchTerm: "",
  });
  const { data } = useGetAllCategoriesQuery(query);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeOut = 500;
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

  const handleCreateCategory = async () => {
    try {
      await createCategory({ name });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  }

  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle>Category <span className="text-rose-400 italic">Management</span></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-between gap-[15px] flex-wrap mb-2">
          <div className="w-[500px] flex items-start md:items-center flex-col md:flex-row gap-[5px]">
            <Input
              type="text"
              placeholder="Category..."
              onKeyUp={handleChange}
              onBlur={debounceValue ? undefined : handleSerch}
              className="w-full"
            />
            {debounceTimeOut ? null : (
              <Button
                onClick={handleSerch}
                className="bg-rose-600 text-white hover:bg-rose-700"
              >
                <Search className="text-black" size={20} />
              </Button>
            )}
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="center gap-[5px]">
                Add Category
                <Plus className="w-[15px]" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
                <DialogDescription>
                  Create a new category below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="label" className="text-right">
                    Name
                  </Label>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateCategory}
                  disabled={isLoading}
                  className="center gap-[5px]"
                >
                  Create
                  {isLoading ? <FaSpinner className="animate-spin" /> : null}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <CategoryTable categories={data?.data || []} />
      </CardContent>
    </Card>
  );
};
