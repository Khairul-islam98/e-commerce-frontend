"use client";

import { ShopHeader } from "./shop-header";

export const ShopDetails = ({ shopId }) => {
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-full mt-[30px] bg-white px-4 py-6 rounded-[15px]">
        <div className="grid gap-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 max-w-3xl items-center justify-center mx-auto">
              <ShopHeader shopId={shopId} />
            </div>

          </div>
          {/* <NextSearchBox
              onValueChange={(value) => setQuery({ ...query, searchTerm: value })}
            /> */}
          {/* <ProductGrid products={products} /> */}
          {/* <DisplayShopProducts
              isLoading={isFetching}
              products={data?.data || []}
            /> */}

          {/* <NextPagination
              totalDocs={data?.meta.totalDoc || 0}
              limit={12}
              onPageChange={(page) => setQuery({ ...query, page })}
              showText
            /> */}
        </div>
      </div>
    </div>
  );
};
