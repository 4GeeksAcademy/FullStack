import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      setError("No se encontró el session_id en la URL.");
      return;
    }

    fetch(`${process.env.BACKEND_URL}/session-status?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener el estado de la sesión.");
        }
        return res.json();
      })
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      })
      .catch((error) => {
        console.error("Error al obtener el estado de la sesión:", error);
        setError("Hubo un problema al verificar el estado del pago.");
      });
  }, []);

  if (error) {
    return (
      <section id="error" style={{ padding: "2rem", color: "red" }}>
        <h2>Error</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete" || status === "paid") {
    return (
      <section
        id="success"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center"
        }}
      >
        <h2>¡Gracias por tu compra!</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1rem",
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Volver al inicio
        </button>
      </section>
    );
  }

  return (
    <section style={{ padding: "2rem" }}>
      <p>Cargando estado del pago...</p>
    </section>
  );
};

export default Return;




