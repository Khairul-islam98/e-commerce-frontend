import { Banner } from "@/components/home/banner";
import { CategoryList } from "@/components/home/category-list";
import { FlashSaleList } from "@/components/home/flash-sale-list";
import { PrioritizeProduct } from "@/components/home/prioritize-product";
import { RecentProductList } from "@/components/home/recent-product-list";
import { ScrollToTopButton } from "@/components/home/scroll-to-top-button";

export default function Home() {
  return (
   <>
    <Banner />
    <PrioritizeProduct />
    <CategoryList />
    <FlashSaleList />
    <RecentProductList />
    <ScrollToTopButton />
   </>
  );
}
