import React from 'react';
import FormCrearServicio from '../component/FormCrearServicio.jsx';
import LayoutHeader from "../component/LayoutHeader.jsx";
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";

const VistaCrearServicio = () => {
  return (
    <>
      <LayoutHeader />
      <FormCrearServicio />
      <Newsletter />
      <Footer />
    </>
  );
};

export default VistaCrearServicio;

