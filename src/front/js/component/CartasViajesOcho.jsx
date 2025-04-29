import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../store/appContext";
import CategoryCard from "./CategoryCard.jsx";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const CartasViajesOcho = ({ onViewService = () => {} }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Usar useNavigate para redirigir al usuario

  const [deals, setDeals] = useState([]); // Para guardar los productos
  const [loading, setLoading] = useState(true); // Para el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  const scrollContainerRef = useRef({}); // Para manejar el scroll lateral

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const backendUrl = process.env.BACKEND_URL;

        if (!backendUrl) {
          throw new Error("BACKEND_URL no está definido en el .env");
        }

        // Realizamos la solicitud fetch
        const response = await fetch(`${backendUrl}/viajes`);

        // Verificamos si la respuesta es correcta
        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.statusText}`);
        }

        // Intentamos parsear la respuesta como JSON
        const data = await response.json();

        // Verificamos la estructura de los datos
        console.log("Respuesta de la API: ", data);
        if (!Array.isArray(data.viajes)) {
          throw new Error("Los datos recibidos no son una lista.");
        }

        setDeals(data.viajes); // Guardamos los productos en el estado
      } catch (err) {
        console.error("Error al cargar los servicios:", err);
        setError("Hubo un error al cargar los servicios.");
      } finally {
        setLoading(false); // Se termina el estado de carga
      }
    };

    fetchDeals();
  }, []); // Se ejecuta una vez cuando el componente se monta

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth / 1.2;
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Verificamos si hay productos para mostrar
  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje mientras carga
  }

  if (error) {
    return <div>{error}</div>; // Muestra un mensaje de error
  }

  return (
    <section className="py-5">
      <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
        <h2 className="mb-4 fw-bold fs-4">Ofertas destacadas</h2>

        {/* Contenedor con fila de tarjetas */}
        <div className="row g-4">
          {deals.map((deal, index) => {
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
                  onViewService={() => navigate("/viajes")} // Navegar a la categoría de "viajes"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CartasViajesOcho;

