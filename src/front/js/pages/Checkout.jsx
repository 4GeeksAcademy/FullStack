import React, { useCallback, useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const stripePromise = loadStripe(
  "pk_test_51RHkEqFNyrX4spGdBv11uJQXp9SbJRaSxzsolRbEeZVVYuzxZqtdF4uBytcTV0BkfQRgMemgaA2DnGI4lriZZpWb00g736yfzD"
);

const Checkout = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const single = location.state?.item;
  const cartItems = single ? [single] : store.cartItems || [];
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.discountPrice * (i.quantity || 1),
    0
  );

  const [clientSecret, setClientSecret] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const startPayment = useCallback(async () => {
    if (clientSecret || loading) return; // evita duplicados
    setError(null);
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No estás autenticado. Inicia sesión.");
      setLoading(false);
      return;
    }

    try {
      const resp = await fetch(`${process.env.BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems.map(it => ({
            title: it.title,
            discountPrice: it.discountPrice,
            quantity: it.quantity || 1,
            image: it.image || "",
            user_id: it.user_id || null
          })),
          total: subtotal
        })
      });
      const data = await resp.json();
      if (resp.ok && data.clientSecret) {
        setClientSecret(data.clientSecret);
        setSessionId(data.sessionId);
      } else {
        setError(data.error || "No se pudo obtener clientSecret");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [cartItems, subtotal, clientSecret, loading]);

  // Auto-arranca la sesión al montar
  useEffect(() => {
    startPayment();
  }, [startPayment]);

  const handleEvent = event => {
    if (
      !single &&
      (event.type === "checkout.session.completed" ||
       event.type === "payment_intent.succeeded")
    ) {
      actions.clearCart();
      navigate("/return");
    }
    if (
      single &&
      (event.type === "checkout.session.completed" ||
       event.type === "payment_intent.succeeded")
    ) {
      navigate("/gracias");
    }
  };

  if (error) {
    return <div className="alert alert-danger p-4">{error}</div>;
  }

  // Mientras carga el clientSecret, spinner
  if (!clientSecret) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div id="checkout" className="p-4">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout options={{ clientSecret, sessionId }} onEvent={handleEvent} />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Checkout;
