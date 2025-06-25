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
        location="bottom"            // posición: bottom, top, bottom-left…
        buttonText="Aceptar"         // texto del botón
        cookieName="cookieConsent"   // nombre de la cookie que guarda la elección
        style={{ background: "#000" }}                 // estilo del fondo
        buttonStyle={{ color: "#fff", fontSize: "13px" }} // estilo del botón
        expires={365}                // caducidad en días
        sameSite="strict"            // sameSite para más seguridad
        overlay={false}              // true para un overlay semitransparente
        containerClasses="my-cookie-banner" // si quieres clases CSS extra
      >
        Usamos cookies propias y de terceros para mejorar tu experiencia.{" "}
        <a
          href="/politica-de-cookies"
          style={{ color: "#FFD700", textDecoration: "underline" }}
        >
          Más info
        </a>
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
