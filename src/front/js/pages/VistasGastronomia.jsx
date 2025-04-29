import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection from "../component/CategoriesSection.jsx";
import PromoBanner from "../component/PromoBanner.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import CartasGastronomiaOcho from "../component/CartasGastronomiaOcho.jsx";


export const VistasGastronomia = () => {
  return (
    <div>
      <LayoutHeader />
      <CategoriesSection />
      <CartasGastronomiaOcho />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </div>
  );
};