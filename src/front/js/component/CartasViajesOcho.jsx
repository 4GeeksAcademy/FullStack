import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom";


const CartasViajesOcho = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadViajes = async () => {
      try {
        await actions.cargarServiciosViajes();
        if (isMounted) setLoading(false);
      } catch (err) {
        console.error("Error al cargar los servicios de viajes:", err);
        if (isMounted) {
          setError("Hubo un error al cargar los servicios.");
          setLoading(false);
        }
      }
    };

    loadViajes();

    return () => {
      isMounted = false;
    };
  }, [actions, forceUpdate]);

  const handleViewProductDetail = (offer) => {
    navigate("/product-detail", { state: { offer } });
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const refreshViajes = () => {
    setLoading(true);
    setForceUpdate(prev => prev + 1);
  };

  if (loading) {
    return (
      <section className="py-5">
        <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando viajes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5">
        <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
          <div className="alert alert-danger">
            {error}
            <button 
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={refreshViajes}
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar primero los más recientes (ya vienen ordenados del backend)
  const viajesAMostrar = showAll ? store.serviciosViajes : store.serviciosViajes.slice(0, 8);

  return (
    <section className="py-5">
      <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold fs-4 mb-0">Ofertas de Viajes</h2>
          <div>
            <button 
              className="btn btn-outline-primary me-2" 
              onClick={refreshViajes}
            >
              <i className="bi bi-arrow-clockwise"></i> Actualizar
            </button>
            <button 
              className="btn btn-outline-primary" 
              onClick={toggleShowAll}
            >
              {showAll ? 'Mostrar menos' : 'Ver todos'}
            </button>
          </div>
        </div>

        <div className="row g-4">
          {viajesAMostrar.map((deal) => {
            const offer = {
              id: deal.id,
              title: deal.title || "Sin título",
              image: deal.image || "https://via.placeholder.com/300x200?text=Sin+imagen",
              rating: deal.rating || 4,
              reviews: deal.reviews || 0,
              discountPrice: deal.discountPrice || deal.price || 0,
              originalPrice: deal.discountPrice ? 
                Math.round(deal.discountPrice * 1.2) : 
                deal.price ? Math.round(deal.price * 1.2) : 0,
              buyers: deal.buyers || 0,
              descripcion: deal.descripcion || "",
              city: deal.city || "Ciudad no especificada"
            };

            return (
              <div className="col-12 col-md-6 col-lg-3" key={deal.id}>
                <CategoryCard
                  offer={offer}
                  onViewService={() => handleViewProductDetail(offer)}
                />
              </div>
            );
          })}
        </div>

        {store.serviciosViajes.length === 0 && (
          <div className="alert alert-info mt-4">
            No hay viajes disponibles actualmente.
          </div>
        )}
      </div>
    </section>
  );
};

export default CartasViajesOcho;