import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection from "../component/CategoriesSection.jsx";
import PromoBanner from "../component/PromoBanner.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import CartasTopOcho from "../component/CartasTopOcho.jsx";


export const VistasTop = () => {
  return (
    <div>
      <LayoutHeader />
      <CategoriesSection />
      <CartasTopOcho />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </div>
  );
};