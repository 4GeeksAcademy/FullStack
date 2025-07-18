import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import HeroBanner from "../component/HeroBanner.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import StyledInfoSectionMenus from '../component/StyledInfoSectionMenus.jsx';
import RelatedContent2 from "../component/RelatedContent2.jsx";
import FAQSection from "../component/FAQSection.jsx";
import WhatsAppButton from "../component/WhatsAppButton.jsx";

export const Menus = () => {
  return (
    <div>
      <LayoutHeader />
      <HeroBanner />
      <StyledInfoSectionMenus/>
      <RelatedContent2 />
      <FAQSection />
      <Newsletter />
      <WhatsAppButton />
      <Footer />
    </div>
  );
};