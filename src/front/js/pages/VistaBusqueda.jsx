import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Footer from "../component/Footer.jsx";
import SearchResults from "../component/SearchResults.jsx";


const VistaBusqueda = () => {
    return( 
    <div>
        <LayoutHeader />
        <SearchResults />
       
        <Footer />
    </div>
  );
};

export default VistaBusqueda;