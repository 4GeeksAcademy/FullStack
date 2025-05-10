import React, { useCallback, useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51RHkEqFNyrX4spGdBv11uJQXp9SbJRaSxzsolRbEeZVVYuzxZqtdF4uBytcTV0BkfQRgMemgaA2DnGI4lriZZpWb00g736yfzD");

const Checkout = () => {
  const { store } = useContext(Context);
  const location = useLocation();
  const single = location.state?.item;

  const cartItems = single ? [single] : store.cartItems || [];
  const subtotal = cartItems.reduce((sum, i) => sum + i.discountPrice * (i.quantity || 1), 0);

  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  const fetchClientSecret = useCallback(() => {
    setError(null);
    const token = localStorage.getItem("token");
    if (!token) return setError("No estás autenticado. Inicia sesión.");

    fetch(`${process.env.BACKEND_URL}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ items: cartItems.map(it => ({ title: it.title, discountPrice: it.discountPrice, quantity: it.quantity || 1, image: it.image || "", user_id: it.user_id || null })), total: subtotal })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(err => setError(err.message));
  }, [cartItems, subtotal]);

  useEffect(() => { fetchClientSecret(); }, [fetchClientSecret]);

  return (
    <div id="checkout" className="p-4">
      {error && <div className="alert alert-danger">{error}</div>}
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default Checkout;
