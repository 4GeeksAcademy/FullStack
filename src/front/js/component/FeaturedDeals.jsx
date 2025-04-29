import React, { useContext } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom";

const FeaturedDeals = ({ onViewService = () => {} }) => {
  const { store } = useContext(Context);
  const navigate = useNavigate(); // Agregamos useNavigate
  
  // Asegurarte que los servicios existen antes de acceder a ellos
  const gastronomia = store.serviciosGastronomia[0];
  const belleza = store.serviciosBelleza[0];
  const viajes = store.serviciosViajes.slice(0, 2); // Primeros 2 de viajes
  
  // Ahora armás un array combinando todo
  const deals = [gastronomia, belleza, ...viajes].filter(Boolean);
  // filter(Boolean) elimina posibles undefined si algún array está vacío
  
  // Esta es la única función nueva que necesitamos agregar
  const handleViewOffer = (offer) => {
    navigate("/ofertas-destacadas", { state: { offer } });
  };
  
  return (
    <section className="py-5">
      <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <h2 className="mb-4 fw-bold fs-4">Ofertas destacadas</h2>
        <div className="row g-4">
          {deals.map((deal, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <CategoryCard 
                offer={deal} 
                onViewService={() => handleViewOffer(deal)} // Usamos la nueva función
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;