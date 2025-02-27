"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    (params: Record<string, string | undefined>) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          currentParams.set(key, value);
        } else {
          currentParams.delete(key);
        }
      });

      const search = currentParams.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
    [searchParams, router, pathname]
  );
  const clearSearchParams = () => {
    router.push(pathname);
  };

  return { searchParams, updateSearchParams, clearSearchParams };
};


