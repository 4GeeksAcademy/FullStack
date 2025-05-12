import React, { useCallback, useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51RHkEqFNyrX4spGdBv11uJQXp9SbJRaSxzsolRbEeZVVYuzxZqtdF4uBytcTV0BkfQRgMemgaA2DnGI4lriZZpWb00g736yfzD"
);

const Checkout = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  // Si viene un item por "Comprar ahora", lo procesamos solo a él.
  const single = location.state?.item;
  const cartItems = single ? [single] : store.cartItems || [];
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.discountPrice * (i.quantity || 1),
    0
  );

  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  // Pedir el clientSecret al backend
  const fetchClientSecret = useCallback(() => {
    setError(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No estás autenticado. Inicia sesión.");
      return;
    }

    fetch(`${process.env.BACKEND_URL}/create-checkout-session`, {
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
    })
      .then(res => res.json())
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("No se pudo obtener clientSecret");
        }
      })
      .catch(err => setError(err.message));
  }, [cartItems, subtotal]);

  useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

  // Manejar eventos de la UI embebida de Stripe
  const handleEvent = event => {
    console.log("Stripe embed event:", event.type);
    // Vaciar el carrito si el pago fue completado y venimos del carrito (no de "Comprar ahora")
    if (
      !single &&
      (event.type === "checkout.session.completed" ||
       event.type === "payment_intent.succeeded")
    ) {
      actions.clearCart();
      navigate("/return");
    }
    // Si es single-item y pago ok, sólo redirigimos
    if (
      single &&
      (event.type === "checkout.session.completed" ||
       event.type === "payment_intent.succeeded")
    ) {
      navigate("/gracias");
    }
  };

  return (
    <div id="checkout" className="p-4">
      {error && <div className="alert alert-danger">{error}</div>}
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout onEvent={handleEvent} />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default Checkout;
