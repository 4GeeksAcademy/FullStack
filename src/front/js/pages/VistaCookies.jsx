import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Footer from "../component/Footer.jsx";
import Newsletter from "../component/Newsletter.jsx";

const VistaCookies = () => {
  const { store } = useContext(Context);
  const [cookies, setCookies] = useState(null); // Para almacenar los datos
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const backendUrl = process.env.BACKEND_URL;

        if (!backendUrl) {
          throw new Error("BACKEND_URL no está definido en el .env");
        }

        const response = await fetch(`${backendUrl}/politicas/3`);

        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.statusText}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();

          console.log("Respuesta del servidor: ", data); // Para debug

          if (data && data.contenido) {
            setCookies(data); // Guardamos la respuesta
          } else {
            throw new Error("No se encontró el campo 'contenido' en la respuesta.");
          }
        } else {
          const text = await response.text();
          throw new Error("La respuesta no es JSON. Recibí HTML: " + text);
        }
      } catch (err) {
        console.error("Error al cargar la política de cookies:", err);
        setError("Hubo un error al cargar la política de cookies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCookies();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <LayoutHeader />

      {/* Contenedor principal */}
      <div className="container my-5">
        <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
          <div className="card-body">
            <h3 className="fw-bold text-center mb-4">
              {cookies ? cookies.titulo : "Cargando..."}
            </h3>
            {/* Contenido justificado */}
            <p
              className="text-muted mb-4"
              style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
            >
              {cookies ? cookies.contenido : "No hay contenido disponible."}
            </p>
          </div>
        </div>
        <Newsletter />
      </div>

      <Footer />
    </div>
  );
};

export default VistaCookies;
