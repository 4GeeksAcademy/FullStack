import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import HeroBanner from "../component/HeroBanner.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import StyledInfoSectionInvitaciones from '../component/StyledInfoSectionInvitaciones.jsx';
import RelatedContent2 from "../component/RelatedContent2.jsx";
import FAQSection from "../component/FAQSection.jsx";
import WhatsAppButton from "../component/WhatsAppButton.jsx";

export const Invitaciones = () => {
  return (
    <div>
      <LayoutHeader />
      <HeroBanner />
      <StyledInfoSectionInvitaciones/>
      <RelatedContent2 />
      <FAQSection />
      <Newsletter />
      <WhatsAppButton />
      <Footer />
    </div>
  );
};