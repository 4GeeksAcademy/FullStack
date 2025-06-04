import React from "react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom
import "../../styles/home.css"; // Asegúrate de que la ruta sea correcta

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 my-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-md-3">
            <h4 className="font-weight-bold mb-3">Camino al Sí</h4>
            <p>
              Diseñamos momentos inolvidables para tu gran día.
            </p>
          </div>
          <div className="col-12 col-md-3">
            <h4 className="font-weight-bold mb-3">Explorar</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/category/belleza" className="text-white no-underline">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h4 className="font-weight-bold mb-3">Empresa</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/sobre-nosotros" className="text-white no-underline">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-white no-underline">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h4 className="font-weight-bold mb-3">Legal</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/terminos" className="text-white no-underline">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="text-white no-underline">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-white no-underline">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-top border-secondary pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-3 mb-md-0">
            © 2023 GroupOn. Todos los derechos reservados.
          </p>
          <div className="d-flex ml-3">
            {/* Añadí gap en lugar de solo margin-right */}
            <a href="https://www.facebook.com" className="text-white" style={{ marginRight: "10px" }}>
              <BsFacebook size={24} />
            </a>
            <a href="https://www.instagram.com" className="text-white">
              <BsInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

