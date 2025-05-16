import React, { useCallback, useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner, Container, Form, Button, Alert, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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

  // Datos de entrega + correo prellenado
  const initialEmail = store.user?.email || store.user?.correo || "";
  const [deliveryEmail, setDeliveryEmail] = useState(initialEmail);
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Stripe
  const [clientSecret, setClientSecret] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const startPayment = useCallback(async () => {
    if (clientSecret || loading) return;
    setError(null);
    setLoading(true);

    // Permitir guest o usuario autenticado
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const resp = await fetch(`${process.env.BACKEND_URL}/create-checkout-session`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          items: cartItems.map(it => ({
            title: it.title,
            discountPrice: it.discountPrice,
            quantity: it.quantity || 1,
            image: it.image || "",
            user_id: it.user_id || null
          })),
          total: subtotal,
          deliveryEmail,
          deliveryName,
          deliveryAddress
        })
      });

      const data = await resp.json();
      if (resp.ok && data.clientSecret) {
        setClientSecret(data.clientSecret);
        setSessionId(data.sessionId);
      } else {
        setError(data.error || "Error al iniciar pago");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [cartItems, subtotal, deliveryEmail, deliveryName, deliveryAddress, clientSecret, loading]);

  useEffect(() => {
    if (formSubmitted) startPayment();
  }, [formSubmitted, startPayment]);

  // Stripe events
  const handleEvent = event => {
    const done =
      event.type === "checkout.session.completed" ||
      event.type === "payment_intent.succeeded";
    if (!done) return;
    if (!single) {
      actions.clearCart();
      navigate("/return");
    } else {
      navigate("/gracias");
    }
  };

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ maxWidth: 500, width: '100%' }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      </Container>
    );
  }

  // Formulario de entrega styled
  if (!formSubmitted) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ maxWidth: 500, width: '100%' }}>
          <div className="text-center mb-4">
            <i className="bi bi-truck text-danger" style={{ fontSize: '3rem' }}></i>
            <h4 className="mt-2 fw-bold">Datos de entrega</h4>
            <p className="text-muted">Completa la información antes de pagar</p>
          </div>
          <Form onSubmit={e => { e.preventDefault(); setFormSubmitted(true); }}>
            <Form.Group className="mb-3" controlId="deliveryEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-envelope-at"></i></InputGroup.Text>
                <Form.Control
                  type="email"
                  value={deliveryEmail}
                  onChange={e => setDeliveryEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="deliveryName">
              <Form.Label>Nombre completo</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-person"></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  value={deliveryName}
                  onChange={e => setDeliveryName(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4" controlId="deliveryAddress">
              <Form.Label>Dirección de entrega</Form.Label>
              <InputGroup>
                <InputGroup.Text><i className="bi bi-geo-alt"></i></InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Button variant="danger" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Procesando...' : 'Continuar al pago'}
            </Button>
          </Form>
        </div>
      </Container>
    );
  }

  // Spinner mientras carga clientSecret
  if (!clientSecret) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow-lg p-4 text-center" style={{ width: 200, height: 200 }}>
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }

  // Checkout embebido de Stripe (mantener centrado)
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: 600, width: '100%' }}>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout options={{ clientSecret, sessionId }} onEvent={handleEvent} />
        </EmbeddedCheckoutProvider>
      </div>
    </Container>
  );
};

export default Checkout;

