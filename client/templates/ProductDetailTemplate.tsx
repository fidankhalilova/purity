import { ProductDetail } from "@/types/product";
import Breadcrumb from "@/components/BreadCrumb";
import ProductHero from "@/sections/Product/ProductHero";
import GlowIngredients from "@/sections/Product/GlowIngredients";
import BoughtTogether from "@/sections/Product/BoughtTogether";
import SimilarProducts from "@/sections/Product/SimilarProducts";
import CustomerReviews from "@/sections/Product/CustomerReviews";
import StickyAddToCart from "@/sections/Product/StickyAddToCart";
import WhyUs from "@/sections/Product/WhyUs";
import PromoMarquee from "@/sections/Product/Marquee";
import OthersBought from "@/sections/AboutUs/OthersBought";
import CardForPromo from "@/sections/Product/CardForPromo";

export default async function ProductDetailTemplate({
  product,
}: {
  product: ProductDetail;
}) {
  return (
    <div className="relative pb-16">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <Breadcrumb overrideLastLabel={product.name} />
        <ProductHero product={product} />
      </div>

      <BoughtTogether product={product} />
      <GlowIngredients product={product} />
      <WhyUs />
      <PromoMarquee />
      <SimilarProducts product={product} />

      <div className="container mx-auto px-4 md:px-6 flex flex-col gap-12">
        <CustomerReviews product={product} />
        <CardForPromo
          category="Our Philosophy"
          title="Glow with Confidence"
          date="October 10, 2023"
          author="Admin"
          excerpt="Our clean formulas are designed to nourish, restore, and reveal your skin’s natural glow—so confidence feels as effortless and radiant as true, timeless beauty itself."
          image="https://purity.nextsky.co/cdn/shop/files/pdp-banner.jpg?v=1760930201&width=3840"
          href="/promo"
        />
        <OthersBought />
      </div>
      <StickyAddToCart product={product} />
    </div>
  );
}
