/* @next-codemod-ignore */
import { AllProducts } from '@/components/all-products/all-products';
import React from 'react';

const ProductPage = ({searchParams}:{
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) => {
    return (
        <>
            <AllProducts searchParams={searchParams} />
            
        </>
    );
};

export default ProductPage;