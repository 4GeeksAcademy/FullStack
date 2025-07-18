import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import HeroBanner from "../component/HeroBanner.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import StyledInfoSectionMesas from '../component/StyledInfoSectionMesas.jsx';
import RelatedContent2 from "../component/RelatedContent2.jsx";
import FAQSection from "../component/FAQSection.jsx";
import WhatsAppButton from "../component/WhatsAppButton.jsx";

export const Mesas = () => {
  return (
    <div>
      <LayoutHeader />
      <HeroBanner />
      <StyledInfoSectionMesas/>
      <RelatedContent2 />
      <FAQSection />
      <Newsletter />
      <WhatsAppButton />
      <Footer />
    </div>
  );
};