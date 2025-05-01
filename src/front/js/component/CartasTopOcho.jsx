import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard.jsx";
import { Context } from "../store/appContext";

const CartasTopOcho = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopDeals = async () => {
      try {
        const backendUrl = process.env.BACKEND_URL;
        
        if (!backendUrl) {
          throw new Error("BACKEND_URL no está definido en el .env");
        }
        
        // Realizamos la solicitud fetch para obtener las ofertas top
        const response = await fetch(`${backendUrl}/top`);
        
        // Verificamos si la respuesta es correcta
        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.statusText}`);
        }
        
        // Intentamos parsear la respuesta como JSON
        const data = await response.json();
        
        // Verificamos la estructura de los datos
        console.log("Respuesta de la API de Top Ofertas: ", data);
        if (!Array.isArray(data.top)) {
          throw new Error("Los datos recibidos no son una lista.");
        }
        
        setDeals(data.top); // Guardamos las ofertas en el estado
      } catch (err) {
        console.error("Error al cargar las Top Ofertas:", err);
        setError("Hubo un error al cargar las Top Ofertas.");
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    };
    
    fetchTopDeals();
  }, []);

  // Función para manejar la visualización de los detalles del servicio
  const handleViewService = (service) => {
    console.log("Ver detalles del servicio:", service);
    
    // Guardamos el servicio seleccionado en el store para poder acceder a él en la página de detalles
    actions.setCurrentService(service);
    
    // SOLUCIÓN: Pasamos el mismo objeto pero como "offer" en vez de como "service"
    navigate("/product-detail", {
      state: { 
        offer: service, // Aquí está el cambio clave: pasamos "service" como "offer"
        category: "Top Ofertas"
      }
    });
  };

  // Verificamos si estamos cargando
  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando ofertas...</p>
      </div>
    );
  }

  // Verificamos si hubo un error
  if (error) {
    return (
      <div className="py-5 text-center text-danger">
        <p>{error}</p>
        <button 
          className="btn btn-primary mt-2"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Verificamos si hay ofertas para mostrar
  if (!deals || deals.length === 0) {
    return (
      <div className="py-5 text-center">
        <p>No hay ofertas disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <section className="py-5">
      <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <h2 className="mb-4 fw-bold fs-4">Top Ofertas</h2>
        
        {/* Contenedor con fila de tarjetas */}
        <div className="row g-4">
          {deals.slice(0, 8).map((deal, index) => {
            const offer = {
              id: deal.id,
              title: deal.nombre || deal.title || "Sin título",
              image: deal.imagen || deal.image || "https://via.placeholder.com/300x200?text=Sin+imagen",
              rating: deal.rating || 4,
              reviews: deal.reviews || 20,
              discountPrice: deal.precio || deal.discountPrice || 0,
              originalPrice:
                deal.originalPrice ||
                (deal.precio
                  ? Math.round(deal.precio * 1.2)
                  : deal.discountPrice
                  ? Math.round(deal.discountPrice * 1.2)
                  : 0),
              buyers: deal.buyers || 5,
              description: deal.descripcion || deal.description || "Sin descripción disponible",
              // Preservamos todos los datos originales para tener la información completa en la página de detalles
              ...deal
            };
            
            return (
              <div className="col-12 col-md-6 col-lg-3" key={index}>
                <CategoryCard
                  offer={offer}
                  onViewService={() => handleViewService(offer)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CartasTopOcho;