// src/component/VistaReservas.jsx
import React from 'react';
import LayoutHeader from "../component/LayoutHeader.jsx"
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import ReservasServicios from "../component/ReservasServicios.jsx"

const VistaReservas = () => {


  return (
    <div>
    <LayoutHeader />
    <ReservasServicios />
    <Newsletter />
    <Footer />
    </div>
  );
};

export default VistaReservas;

