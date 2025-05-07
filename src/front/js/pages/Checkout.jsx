import React, { useCallback, useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Context } from "../store/appContext";

const stripePromise = loadStripe("pk_test_51RHkEqFNyrX4spGdBv11uJQXp9SbJRaSxzsolRbEeZVVYuzxZqtdF4uBytcTV0BkfQRgMemgaA2DnGI4lriZZpWb00g736yfzD");

const Checkout = () => {
  const { store } = useContext(Context);
  const cartItems = store.cartItems || [];

  const subtotal = cartItems.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  // Función para obtener el client secret
  const fetchClientSecret = useCallback(() => {
    setError(null);

    // Obtener el token de localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No estás autenticado. Por favor, inicia sesión.");
      return;
    }

    fetch(`${process.env.BACKEND_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Agregar el token de autorización
      },
      body: JSON.stringify({
        items: cartItems,
        total: subtotal
      })
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Unexpected response:", text);
          throw new Error("Invalid response from server.");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.clientSecret) {
          throw new Error("Client secret not found in response.");
        }
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        setError(error.message);
      });
  }, [cartItems, subtotal]);

  // Llamar a fetchClientSecret cuando el componente se monte
  useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

  const options = { clientSecret };

  return (
    <div id="checkout">
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Checkout;


