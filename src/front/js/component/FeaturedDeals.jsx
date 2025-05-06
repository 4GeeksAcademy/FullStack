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
      .filter(offer => offer && offer.id) // Filtramos ofertas válidas con ID
      .slice(0, count); // Tomamos solo el número necesario
  };

  // Obtener ofertas destacadas
  const gastronomia = getValidOffers(store.serviciosGastronomia, 1)[0];
  const belleza = getValidOffers(store.serviciosBelleza, 1)[0];
  const viajes = getValidOffers(store.serviciosViajes, 2);

  // Combinar todas las ofertas
  const deals = [gastronomia, belleza, ...viajes].filter(offer => offer);

  // Función para manejar el click en una card
  const handleViewOffer = (offer) => {
    if (!offer || !offer.id) return;
    
    // Solución especial para "Ruta del vino en Mendoza"
    const uniqueId = offer.id === 2 && offer.title === "Ruta del vino en Mendoza" 
      ? '2-ruta-del-vino-en-mendoza' 
      : offer.id;
    
    navigate(`/product-detail/${uniqueId}`, {
      state: {
        offer,
        category: getCategory(offer.id)
      }
    });
    
    onViewService(offer);
  };

  // Función para determinar categoría
  const getCategory = (offerId) => {
    if (store.serviciosGastronomia.some(o => o.id === offerId)) return 'gastronomia';
    if (store.serviciosBelleza.some(o => o.id === offerId)) return 'belleza';
    if (store.serviciosViajes.some(o => o.id === offerId)) return 'viajes';
    return '';
  };

  return (
    <section className="py-5">
      <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <h2 className="mb-4 fw-bold fs-4">Ofertas destacadas</h2>
        <div className="row g-4">
          {deals.map((deal) => (
            <div className="col-12 col-md-6 col-lg-3" key={deal.id}>
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