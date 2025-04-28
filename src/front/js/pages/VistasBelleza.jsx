import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection from "../component/CategoriesSection.jsx";
import PromoBanner from "../component/PromoBanner.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import CartasBellezaOcho from "../component/CartasBellezaOcho.jsx";

export const VistasBelleza = () => {
  return (
    <div>
      <LayoutHeader />
      <CategoriesSection />
      <CartasBellezaOcho />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </div>
  );
};