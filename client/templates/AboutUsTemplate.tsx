import Breadcrumb from "@/components/BreadCrumb";
import AboutBanner from "@/sections/AboutUs/AboutBanner";
import AboutTimeline from "@/sections/AboutUs/AboutTimeline";
import BlogLine from "@/sections/AboutUs/BlogLine";
import OthersBought from "@/sections/AboutUs/OthersBought";
import OurVision from "@/sections/AboutUs/OurVision";
import PromoGrids from "@/sections/AboutUs/PromoGrids";
import Quote from "@/sections/AboutUs/Quote";
import { useTranslations } from "next-intl";

export default function AboutUsTemplate() {
  const t = useTranslations("AboutUs");
  return (
    <div className="container mx-auto px-6 py-4">
      <Breadcrumb />
      <div className="flex flex-col gap-6 sm:gap-12">
        <AboutBanner />
        <OurVision />
        <PromoGrids />
        <AboutTimeline />
        <OthersBought />
        <Quote />
        <BlogLine />
      </div>
    </div>
  );
}
