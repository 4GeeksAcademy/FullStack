import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    // Verificar si el session_id está presente
    if (!sessionId) {
      setError("session_id no encontrado en la URL.");
      return;
    }

    // Hacer la solicitud para obtener el estado de la sesión
    fetch(`${process.env.BACKEND_URL}/session-status?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener el estado de la sesión");
        }
        return res.json();
      })
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      })
      .catch((error) => {
        console.error("Error al obtener el estado de la sesión:", error);
        setError(error.message); // Mostrar el error en el estado
      });
  }, []);

  if (error) {
    return (
      <section id="error">
        <p>Error: {error}</p>
      </section>
    );
  }

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          ¡Gracias por tu compra! Se enviará una confirmación a {customerEmail}.
        </p>
      </section>
    );
  }

  return null;
};

export default Return;

