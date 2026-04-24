import HeroSlideshow from "@/sections/Home/HeroSlideshow";
import HomeMarquee from "@/sections/Home/HomeMarquee";
import TopSellers from "@/sections/Home/TopSellers";
import ExploreCollections from "@/sections/Home/ExploreCollections";
import SkinConcerns from "@/sections/Home/SkinConcerns";
import ChooseYourShade from "@/sections/Home/ChooseYourShade";
import EditorChoiceSet from "@/sections/Home/EditorChoiceSet";
import FindYourSolutions from "@/sections/Home/FindYourSolutions";
import CommunityStories from "@/sections/Home/CommunityStories";
import WhatTheyAreSaying from "@/sections/Home/WhatTheyAreSaying";
import CleanseYourSkin from "@/sections/Home/CleanseYourSkin";
import FeaturedBrandsAndDeals from "@/sections/Home/FeaturedBrandsAndDeals";
import HomeHelpCenter from "@/sections/Home/HomeHelpCenter";
import PromoMarquee from "@/sections/Product/Marquee";
import InstagramFeed from "@/sections/Home/InstagramFeed";
import Testimonials from "@/sections/Home/Testimonials";
import SpotlessInAWeek from "@/sections/Home/SpotlessInAWeek";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSlideshow />
      <HomeMarquee />
      <TopSellers />

      <ExploreCollections />
      <SkinConcerns />

      <div className="container mx-auto px-4 md:px-6">
        <ChooseYourShade />
      </div>

      <EditorChoiceSet />

      <FindYourSolutions />
      <CommunityStories />
      <WhatTheyAreSaying />

      <div className="container mx-auto px-4 md:px-6">
        <SpotlessInAWeek />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <CleanseYourSkin />
        <FeaturedBrandsAndDeals />
      </div>

      <PromoMarquee />
      <div className="container mx-auto px-4 md:px-6">
        <Testimonials />
        <HomeHelpCenter />
        <InstagramFeed />
      </div>
    </div>
  );
}
