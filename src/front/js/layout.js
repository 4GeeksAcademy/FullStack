import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import CartPage from "./component/CartPage.jsx"; 
import { Product } from "./pages/Product.jsx";
import LoginPage from "./component/LoginPage.jsx";
import { TodasLasCategorias } from "./pages/TodasLasCategorias.jsx" 
import { VistasTop } from "./pages/VistasTop.jsx"
import { VistasViajes } from "./pages/VistasViajes.jsx";
import { VistasBelleza } from "./pages/VistasBelleza.jsx";
import { VistasGastronomia } from "./pages/VistasGastronomia.jsx";
import VistaPoliticaDePrivacidad from "./pages/PoliticasDePrivacidad.jsx"
import VistaCookies from "./pages/VistaCookies.jsx"
import VistaSobreNosotros from "./pages/VistaSobreNosotros.jsx"
import VistaTerminosYCondiciones from "./pages/VistaTerminosYCondiciones.jsx"
import VistaContacto from "./pages/VistaContacto.jsx";
import ProductDetail from "./component/ProductDetail.jsx";
import OfertasDestacadas from "./component/OfertasDestacadas.jsx";
import CategoryPage from "./component/CategoryPage.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import VistaCrearServicio from "./pages/VistaCrearServicio.jsx";
import VistaMiPerFil from "./pages/VistaMiPerfil.jsx"




//create your first component
const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/single/:theid" element={<Single />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/todaslascategorias" element={<TodasLasCategorias />} />
            <Route path="/top" element={<VistasTop />} />
            <Route path="/viajes" element={<VistasViajes />} />
            <Route path="/belleza" element={<VistasBelleza />} />
            <Route path="/gastronomia" element={<VistasGastronomia />} />
            <Route path="/politica-privacidad" element={<VistaPoliticaDePrivacidad />} />
            <Route path="/cookies" element={<VistaCookies />} />
            <Route path="/sobre-nosotros" element={<VistaSobreNosotros />} />
            <Route path="/terminos" element={<VistaTerminosYCondiciones />} />
            <Route path="/Contacto" element={<VistaContacto />} />
            <Route path="/crear-servicio" element={< VistaCrearServicio/>} />
            <Route path="/perfil" element={< VistaMiPerFil/>} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/ofertas-destacadas" element={<OfertasDestacadas />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            

          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
            