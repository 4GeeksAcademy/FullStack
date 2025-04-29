import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import FormMiPerfil from "../component/FormMiPerfil.jsx"

const VistaMiPerfil = () => {
  return (
    <div>
    <LayoutHeader />
    <FormMiPerfil />
    <Newsletter />
    <Footer />
    </div>
  );
};

export default VistaMiPerfil;