"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Category } from "./category";
import useDebounce from "@/hooks/use-debounce";
import { useParams } from "@/hooks/use-params";
import { useForm } from "react-hook-form";

export const ProductFilter = () => {
  const { searchParams, updateSearchParams } = useParams();
  const { register, reset } = useForm();
  const [debounce, setDebounce] = useDebounce("");
  const [isTouched, setIsTouched] = useState(false);
  const [show, setShow] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" }); 

  const handleInputChange = (field: any, value: string) => {
      const paramsObject = Object.fromEntries(searchParams.entries());
      updateSearchParams({ ...paramsObject, [field]: value });
    };

  useEffect(() => {
    if (isTouched) {
      updateSearchParams({ searchTerm: debounce });
    }
  }, [debounce, updateSearchParams, isTouched]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (window.innerWidth > 768) return; 
      if (target.closest(".queryDrawer") || target.closest(".menu")) return;

      setShow(false);
    };

    if (show) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.body.removeEventListener("mousedown", handleOutsideClick);
  }, [show]);

  // Function to clear filters
  const clearFilters = () => {
    setDebounce(""); 
    setPriceRange({ min: "", max: "" });
    updateSearchParams({ searchTerm: "", minPrice: "", maxPrice: "" }); 
    setIsTouched(false); 
  };


  return (
    <div className="relative">
      {/* Toggle Button for Mobile */}
      <button
        className="menu flex items-center gap-2 md:hidden text-sm font-semibold px-4 py-2 bg-gray-100 rounded-md shadow dark:text-black"
        onClick={() => setShow(!show)}
      >
        <SlidersHorizontal className="h-4 w-4" /> Filter
      </button>

      {/* Sidebar */}
      <div
        className={`queryDrawer  fixed inset-y-0 left-0 z-50 w-4/5 md:w-64 bg-slate-800 text-white p-6 transform transition-transform duration-300 ${
          show ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        {/* Close Button for Mobile */}
        <button
          className="menu flex items-center justify-end md:hidden mb-4 text-gray-200"
          onClick={() => setShow(false)}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Search</h3>
          <Input
            type="text"
            {...register("searchTerm")}
            placeholder="Search products..."
        
            className="w-full text-black dark:text-white"
            onChange={(e) => handleInputChange("searchTerm", e.target.value)}
          />
        </div>

        {/* Category */}
        <Category />

        {/* Price Range */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Price Range</h3>
          <div className="flex gap-2 mb-4">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="w-1/2 dark:text-white text-black"
              min={0}
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="w-1/2 dark:text-white text-black"
              min={0}
            />
          </div>
          <Button
            className="w-full bg-rose-600 text-white"
            onClick={() =>
              updateSearchParams({ minPrice: priceRange.min, maxPrice: priceRange.max })
            }
          >
            Apply
          </Button>
        </div>

        {/* Clear Filters */}
        <div className="mt-6">
          <Button  className="w-full" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {show && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShow(false)}
        />
      )}
    </div>
  );
};
