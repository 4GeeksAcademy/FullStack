import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import HeroBanner from "../component/HeroBanner.jsx";
import CategoriesSection from "../component/CategoriesSection.jsx";
import FeaturedDeals from "../component/FeaturedDeals.jsx";
import RelatedContent from "../component/RelatedContent.jsx";
import PromoBanner from "../component/PromoBanner.jsx";
import SpecialOffersCarousel from "../component/SpecialOffersCarousel.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import TravelSections from "../component/TravelSections.jsx"
import StyledInfoSection from '../component/StyledInfoSection.jsx';
import RelatedContent2 from "../component/RelatedContent2.jsx";
import FAQSection from "../component/FAQSection.jsx";

export const Home = () => {
  return (
    <div>
      <LayoutHeader />
      <HeroBanner />
      <CategoriesSection/>
      <RelatedContent />
      <StyledInfoSection/>
      <TravelSections/>
      <PromoBanner />
      <RelatedContent2 />
      <FAQSection />
      <Newsletter />
      <Footer />
    </div>
  );
};
