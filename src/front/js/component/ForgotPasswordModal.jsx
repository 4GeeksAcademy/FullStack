import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Error enviando el enlace');
      }
      setStatus({ loading: false, error: null, success: true });
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          {/* Logo in blue */}
          <i className="bi bi-envelope-at text-primary" style={{ fontSize: '3rem' }}></i>
          {/* Heading in black */}
          <h2 className="mt-3 fw-bold text-dark">Recuperar contraseña</h2>
          <p className="text-dark">Introduce tu correo y te enviaremos un enlace para restablecerla.</p>
        </div>

        {status.error && <Alert variant="danger">{status.error}</Alert>}
        {status.success ? (
          <Alert variant="success">
            Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña.
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="forgotEmail" className="mb-3">
              {/* Label in black */}
              <Form.Label className="text-dark">Correo electrónico</Form.Label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope-at"></i></span>
                <Form.Control
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            {/* Button in red */}
            <Button variant="danger" type="submit" className="w-100 mb-2" disabled={status.loading}>
              {status.loading ? <Spinner animation="border" size="sm" /> : 'Enviar enlace'}
            </Button>
          </Form>
        )}

        <div className="text-center">
          {/* Link in blue, no underline */}
          <Link to="/login" className="text-primary text-decoration-none">
            Volver al login
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;

