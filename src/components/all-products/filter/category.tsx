import React, { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "@/hooks/use-params";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { ICategoryInfo } from "@/types";

export const Category = () => {
  const { searchParams, updateSearchParams } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCategoryNames = useMemo(
    () => searchParams.get("category")?.split(",").filter(Boolean) || [],
    [searchParams]
  );

  const { data: categoriesData, isFetching } = useGetAllCategoriesQuery({
    searchTerm,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableCategories = useMemo(() => {
    if (!categoriesData?.data) return [];
    return categoriesData.data.filter((category: any) => {
      if (selectedCategoryNames.includes(category.name)) return false;

    
      if (searchTerm.trim() === "") return true; 
      return category.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [categoriesData, selectedCategoryNames, searchTerm]);

  const toggleCategory = (categoryName: string) => {
    const newSelectedCategories = selectedCategoryNames.includes(categoryName)
      ? selectedCategoryNames.filter((name) => name !== categoryName)
      : [...selectedCategoryNames, categoryName];

    updateSearchParams({
      category: newSelectedCategories.join(","),
    });
  };

  const addCategory = (category: ICategoryInfo) => {
    const newSelectedCategories = [...selectedCategoryNames, category.name];
    updateSearchParams({
      category: newSelectedCategories.join(","),
    });
    setIsFocused(false);
    setSearchTerm("");
  };

  const removeCategory = (categoryName: string) => {
    toggleCategory(categoryName);
  };

  return (
    <div>
      <Label className="text-lg font-medium">Categories</Label>

      <div ref={containerRef} className="relative mt-2">
        {/* Search Input with Selected Categories */}
        <div className="flex flex-wrap items-center px-3 py-2 border rounded-lg shadow-sm border-input focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
          {selectedCategoryNames.map((categoryName) => (
            <div
              key={categoryName}
              className="flex items-center px-2 py-1 mr-2 text-sm rounded-full bg-primary/50 text-primary"
            >
              <span className="text-white">{categoryName}</span>
              <button
                type="button"
                className="ml-1 text-primary hover:text-primary-foreground"
                onClick={() => removeCategory(categoryName)}
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}

          <input
            className="w-full outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search category"
            id="category-search"
          />
        </div>

        {/* Dropdown Suggestions */}
        {isFocused && !isFetching && (
          <Card className="absolute z-10 w-full top-full mt-2 max-h-[250px] overflow-auto shadow-lg rounded-lg smoothBar">
            <CardContent className="p-0">
              {availableCategories.length > 0 ? (
                availableCategories.map((category: any) => {
                  // Split the category name to highlight the matched part
                  const matchIndex = category.name
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase());
                  const beforeMatch = category.name.slice(0, matchIndex);
                  const matchText = category.name.slice(
                    matchIndex,
                    matchIndex + searchTerm.length
                  );
                  const afterMatch = category.name.slice(
                    matchIndex + searchTerm.length
                  );

                  return (
                    <div
                      key={category.name}
                      className="flex items-center px-4 py-3 hover:bg-primary-foreground cursor-pointer"
                      onClick={() => addCategory(category)}
                    >
                      <span>
                        {beforeMatch}
                        <strong className="text-primary">{matchText}</strong>
                        {afterMatch}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  No categories found
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
