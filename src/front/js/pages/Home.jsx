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
import CookieConsent from 'react-cookie-consent';

export const Home = () => {
  return (
    <div>
      <LayoutHeader />
      <HeroBanner />
             <CookieConsent
  location="bottom"
  cookieName="cookieConsent"
  expires={365}
  sameSite="strict"
  overlay={false}
  containerClasses="cookie-banner"
  style={{
    background: "#000",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1rem",
  }}
  buttonText="Aceptar"
  buttonStyle={{
    background: "#fff",
    color: "#dc3545",
    fontWeight: "bold",
    fontSize: "13px",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    marginLeft: "1rem",
  }}
  declineButtonText="Rechazar"
  declineButtonStyle={{
    background: "transparent",
    color: "#fff",
    fontSize: "13px",
    textDecoration: "underline",
    marginLeft: "1rem",
  }}
  enableDeclineButton
  onDecline={() => {
    // aquí das por rechazadas las cookies de terceros
  }}
  buttonWrapperClasses="cookie-accept-btn"
>
  <span style={{ color: "#fff" }}>
    Usamos cookies propias y de terceros para mejorar tu experiencia.&nbsp;
    <a
      href="/politica-de-cookies"
      style={{
        color: "#ffc107",
        textDecoration: "underline",
        fontWeight: "bold",
      }}
    >
      Más info
    </a>
  </span>
</CookieConsent>
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
