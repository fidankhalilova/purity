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

interface ProductDetailTemplateProps {
  product: ProductDetail;
}

export default async function ProductDetailTemplate({
  product,
}: ProductDetailTemplateProps) {
  const mappedReviews = (product?.reviews || []).map((review: any) => ({
    _id: review._id || review.id || `temp-${Math.random()}`,
    author: review.author,
    rating: review.rating,
    date: review.date || new Date().toISOString(),
    title: review.title,
    body: review.body,
    images: review.images || [],
  }));
  return (
    <div className="relative pb-16">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <Breadcrumb overrideLastLabel={product?.name || "Product"} />
        <ProductHero product={product} />
      </div>

      <BoughtTogether items={product?.boughtTogether || []} />
      <GlowIngredients ingredients={product?.glowIngredients || []} />
      <WhyUs />
      <PromoMarquee />
      <SimilarProducts products={product?.similarProducts || []} />

      <div className="container mx-auto px-4 md:px-6 flex flex-col gap-12">
        <CustomerReviews
          productId={product?._id || ""}
          initialReviews={mappedReviews}
        />
        <CardForPromo
          category="Our Philosophy"
          title="Glow with Confidence"
          date="October 10, 2023"
          author="Admin"
          excerpt="Our clean formulas are designed to nourish, restore, and reveal your skin's natural glow—so confidence feels as effortless and radiant as true, timeless beauty itself."
          image="https://purity.nextsky.co/cdn/shop/files/pdp-banner.jpg?v=1760930201&width=3840"
          href="/promo"
        />
        <OthersBought />
      </div>
      <StickyAddToCart product={product} />
    </div>
  );
}
