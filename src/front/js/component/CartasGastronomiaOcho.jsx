import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";

const CartasGastronomiaOcho = ({ onViewService = () => {} }) => {
  const { store } = useContext(Context);
  const [deals, setDeals] = useState([]); // Para manejar las ofertas
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchGastronomiaDeals = async () => {
      try {
        const backendUrl = process.env.BACKEND_URL;

        if (!backendUrl) {
          throw new Error("BACKEND_URL no está definido en el .env");
        }

        // Realizamos la solicitud fetch para obtener las ofertas de gastronomía
        const response = await fetch(`${backendUrl}/gastronomia`);

        // Verificamos si la respuesta es correcta
        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.statusText}`);
        }

        // Intentamos parsear la respuesta como JSON
        const data = await response.json();

        // Verificamos la estructura de los datos
        console.log("Respuesta de la API de Gastronomía: ", data);
        if (!Array.isArray(data.gastronomia)) {
          throw new Error("Los datos recibidos no son una lista.");
        }

        setDeals(data.gastronomia); // Guardamos las ofertas en el estado
      } catch (err) {
        console.error("Error al cargar las ofertas de gastronomía:", err);
        setError("Hubo un error al cargar las ofertas de gastronomía.");
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    };

    fetchGastronomiaDeals();
  }, []); // Se ejecuta una vez cuando el componente se monta

  // Verificamos si estamos cargando
  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje mientras carga
  }

  // Verificamos si hubo un error
  if (error) {
    return <div>{error}</div>; // Muestra un mensaje de error
  }

  return (
    <section className="py-5">
      <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <h2 className="mb-4 fw-bold fs-4">Ofertas destacadas</h2>

        {/* Contenedor con fila de tarjetas */}
        <div className="row g-4">
          {deals.slice(0, 8).map((deal, index) => {
            const offer = {
              title: deal.nombre || deal.title || "Sin título",
              image:
                deal.imagen ||
                deal.image ||
                "https://via.placeholder.com/300x200?text=Sin+imagen",
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
            };

            return (
              <div className="col-12 col-md-6 col-lg-3" key={index}>
                <CategoryCard
                  offer={offer}
                  onViewService={() => {}} // Esto anula la navegación
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CartasGastronomiaOcho;
