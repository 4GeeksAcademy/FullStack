import React, { useContext } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom";

const FeaturedDeals = ({ onViewService = () => {} }) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  // Obtener las ofertas asegurando que existan y tengan ID
  const getValidOffers = (offers, count) => {
    return offers
      .filter(offer => offer && offer.id)
      .slice(0, count);
  };

  // Obtener ofertas destacadas con identificadores únicos
  const gastronomia = getValidOffers(store.serviciosGastronomia, 1)[0];
  const belleza = getValidOffers(store.serviciosBelleza, 1)[0];
  const viajes = getValidOffers(store.serviciosViajes, 2);

  // Combinar todas las ofertas con identificador de origen
  const deals = [
    gastronomia ? { ...gastronomia, origin: 'featured-gastronomia' } : null,
    belleza ? { ...belleza, origin: 'featured-belleza' } : null,
    ...viajes.map(v => v ? { ...v, origin: 'featured-viajes' } : null)
  ].filter(offer => offer);

  // Función para manejar el click en una card
  const handleViewOffer = (offer) => {
    if (!offer || !offer.id) return;
    
    navigate(`/product-detail`, {
      state: {
        offer: {
          ...offer,
          // Forzamos la categoría correcta basada en el origen
          category: offer.origin.replace('featured-', '')
        }
      }
    });
    
    onViewService(offer);
  };

  return (
    <section className="py-5">
      <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <h2 className="mb-4 fw-bold fs-4">Ofertas destacadas</h2>
        <div className="row g-4">
          {deals.map((deal) => (
            <div className="col-12 col-md-6 col-lg-3" key={`${deal.id}-${deal.origin}`}>
              <CategoryCard 
                offer={deal} 
                onViewService={() => handleViewOffer(deal)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;