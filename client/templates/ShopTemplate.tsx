import Breadcrumb from "@/components/BreadCrumb";
import ShopLayout from "@/layout/ShopLayout";
import OthersBought from "@/sections/AboutUs/OthersBought";
import CategoryList from "@/sections/Shop/CategoryList";
import ProductList from "@/sections/Shop/ProductList";
import ShopBanner from "@/sections/Shop/ShopBanner";
import ShopFilters from "@/sections/Shop/ShopFilters";

export default function ShopTemplate() {
  return (
    <div className="pb-10">
      <div>
        <ShopBanner />
      </div>
      <div className="container mx-auto px-6 py-4">
        <CategoryList />
        <ShopLayout sidebar={<ShopFilters />}>
          <ProductList />
        </ShopLayout>
        <OthersBought />
      </div>
    </div>
  );
}
