import { ShopDetails } from "@/components/shop-page/shop-details";


const ShopPage = ({ params }: { params: any }) => {
    console.log("shio " , {params});
    return (
        <>
             <ShopDetails shopId={params.shopId} />
        </>
    );
};

export default ShopPage;