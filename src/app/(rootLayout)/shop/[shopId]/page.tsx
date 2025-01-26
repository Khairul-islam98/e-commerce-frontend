import { ShopDetails } from "@/components/shop-page/shop-details";


const ShopPage = ({ params }: { params: any }) => {

    return (
        <>
             <ShopDetails shopId={params.shopId} />
        </>
    );
};

export default ShopPage;