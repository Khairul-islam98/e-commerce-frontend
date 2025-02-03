import { useGetCategoryRelatedProductsQuery } from "@/redux/features/product/productApi";
import { ProductCard } from "../all-products/product-card";
import { IProduct } from "@/types";


export const CategoryRelatedProduct = ({categoryId, productData}: {categoryId: string, productData: any}) => {

    const {data} = useGetCategoryRelatedProductsQuery(categoryId)
  
    const products = data?.data.filter((product: IProduct) => product.categoryInfo?.name === productData.categoryInfo.name);

    return (
        <div className="mt-[30px]">
      <h1
        className={`px-[10px] text-[40px] font-[400] w-full border-b-[1px] border-borderColor mb-3`}
      >
        Related Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-h-10">
        {products?.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    );
};

