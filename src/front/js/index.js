import React from "react";
import ReactDOM from "react-dom/client";  // para React 18
import ReactPixel from "react-facebook-pixel";

// 2) Importa tus estilos y layout
import "../styles/index.css";
import Layout from "./layout";
import './component/facebook'; 

// 3) Inicializa el Facebook Pixel
ReactPixel.init(
  "23994166343528311",  // tu Pixel ID
  null,                   // coincidencia avanzada (puede dejarse null)
  { autoConfig: true, debug: false }
);

// 4) Envía el evento PageView al cargar la app
ReactPixel.pageView();

// 5) Listener global para capturar eventos via data-attributes
//    Solo necesitas añadir data-fbevent y data-fbparams en tus botones
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-fbevent]");
  if (!el) return;

  const eventName = el.dataset.fbevent;
  let params = {};
  try {
    params = JSON.parse(el.dataset.fbparams || "{}");
  } catch (err) {
    console.warn("fbparams no es JSON válido", err);
  }

  ReactPixel.track(eventName, params);
});

// 6) Renderiza la aplicación con React 18
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Layout />);


