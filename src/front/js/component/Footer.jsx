import React from "react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 my-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-md-3">
            <h4 className="font-weight-bold mb-3">GrouponClone</h4>
            <p>
              Descubre las mejores ofertas en tu ciudad y ahorra hasta un 70%.
            </p>
          </div>
          <div className="col-12 col-md-3">
            <h4 className="font-weight-bold mb-3">Explorar</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/ofertas" className="hover:text-white">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="hover:text-white">
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/ciudades" className="hover:text-white">
                  Ciudades
                </Link>
              </li>
              <li>
                <Link to="/novedades" className="hover:text-white">
                  Novedades
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h4 className="font-weight-bold mb-3">Empresa</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/sobre-nosotros" className="hover:text-white">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/trabaja-con-nosotros" className="hover:text-white">
                  Trabaja con nosotros
                </Link>
              </li>
              <li>
                <Link to="/para-negocios" className="hover:text-white">
                  Para negocios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h4 className="font-weight-bold mb-3">Legal</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/terminos" className="hover:text-white">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="hover:text-white">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-top border-secondary pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-3 mb-md-0">
            © 2023 GrouponClone. Todos los derechos reservados.
          </p>
          <div className="d-flex space-x-3">
            <a href="https://www.facebook.com" className="hover:text-white">
              <BsFacebook size={24} />
            </a>
            <a href="https://www.twitter.com" className="hover:text-white">
              <BsTwitter size={24} />
            </a>
            <a href="https://www.instagram.com" className="hover:text-white">
              <BsInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
