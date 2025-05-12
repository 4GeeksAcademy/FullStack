import React, { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Return = () => {
  const { actions } = useContext(Context);
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  // Estilos en línea
  const containerStyle = {
    maxWidth: "480px",
    margin: "5% auto",
    padding: "2rem",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  };
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
  };
  const titleStyle = {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#333",
  };
  const messageStyle = {
    margin: "1.5rem 0",
    fontSize: "1rem",
    color: "#555",
  };
  const buttonStyle = {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "1rem",
  };

  // 1) Tras montar, comprobamos el session_id y pedimos el estado
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    if (!sessionId) {
      setError("No se encontró el session_id en la URL.");
      return;
    }

    fetch(`${process.env.BACKEND_URL}/session-status?session_id=${sessionId}`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo obtener el estado de la sesión.");
        return res.json();
      })
      .then(data => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        
        // AÑADIDO: Vaciar carrito cuando el pago es exitoso
        if (data.status === "complete" || data.status === "paid") {
          actions.clearCart();
        }
      })
      .catch(err => {
        console.error("Error al obtener el estado del pago:", err);
        setError("Hubo un problema al verificar el estado del pago.");
      });
  }, []);

  // 2) Cuando status pase a 'complete' o 'paid', vaciamos el carrito
  useEffect(() => {
    if (status === "complete" || status === "paid") {
      actions.clearCart();
    }
  }, [status, actions]);

  if (error) {
    return (
      <section id="error" style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        <h2>Error</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (status === "open") {
    // Si aún está abierta la sesión volvemos a checkout
    return <Navigate to="/checkout" />;
  }

  if (status === "complete" || status === "paid") {
    // Ya vaciamos el carrito en el useEffect anterior
    return (
      <div style={containerStyle}>
        {/* Cabecera con logo */}
        <div style={headerStyle}>
          <i className="bi bi-house-fill fs-2 text-danger me-2"></i>
          <h1 style={titleStyle}>GroupOn</h1>
        </div>
        {/* Mensaje de éxito */}
        <div style={messageStyle}>
          <p>¡Gracias por tu compra!</p>
          <p>Hemos enviado un recibo a <strong>{customerEmail}</strong></p>
        </div>
        {/* Botón volver al inicio */}
        <button style={buttonStyle} onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    );
  }

  // Estado de carga
  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <p>Cargando estado del pago...</p>
    </section>
  );
};


export default Return;

