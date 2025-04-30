import React from 'react';
import LayoutHeader from "../component/LayoutHeader.jsx"
import Newsletter from "../component/Newsletter.jsx";
import Footer from "../component/Footer.jsx";
import MisCompras from '../component/MisCompras.jsx';

const VistaMisCompras = () => {


  return (
    <div>
    <LayoutHeader />
    <MisCompras />
    <Newsletter />
    <Footer />
    </div>
  );
};

export default VistaMisCompras;
