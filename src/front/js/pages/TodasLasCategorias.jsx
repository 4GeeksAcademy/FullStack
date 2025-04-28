import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection from "../component/CategoriesSection.jsx";
import FeaturedDeals from "../component/FeaturedDeals.jsx";
import RelatedContent from "../component/RelatedContent.jsx";
import PromoBanner from "../component/PromoBanner.jsx";
import SpecialOffersCarousel from "../component/SpecialOffersCarousel.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";

export const TodasLasCategorias = () => {
  return (
    <div>
      <LayoutHeader />
      <CategoriesSection />
      <FeaturedDeals />
      <RelatedContent />
      <Newsletter />
      <Footer />
    </div>
  );
};