import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection from "../component/CategoriesSection.jsx";
import PromoBanner from "../component/PromoBanner.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import CartasViajesOcho from "../component/CartasViajesOcho.jsx";

export const VistasViajes = () => {
  return (
    <div>
      <LayoutHeader />
      <CategoriesSection />
      <CartasViajesOcho />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </div>
  );
};