import { ProductDetails } from "@/components/product-details/product-details";

interface PageProps {
    params: { productId: string };
  }
  
  export default async function ProductDetailsPage({ params }: PageProps)  {
    const { productId } =  params;


    
    return (
      <>
        <ProductDetails productId={productId}  />
      </>
    );
  };
  
  