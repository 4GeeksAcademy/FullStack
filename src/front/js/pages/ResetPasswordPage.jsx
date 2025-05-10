import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  useEffect(() => {
    if (!token) {
      setStatus({ loading: false, error: 'Token no proporcionado.', success: false });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus({ loading: false, error: 'Las contraseñas no coinciden.', success: false });
      return;
    }

    setStatus({ loading: true, error: null, success: false });
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error al restablecer la contraseña');
      }
      setStatus({ loading: false, error: null, success: true });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          {/* Logo in blue */}
          <i className="bi bi-key-fill text-primary" style={{ fontSize: '3rem' }}></i>
          {/* Heading in black */}
          <h2 className="mt-3 fw-bold text-dark">Restablecer contraseña</h2>
          <p className="text-dark">Introduce tu nueva contraseña para tu cuenta.</p>
        </div>

        {!token && <Alert variant="danger">Token inválido o faltante.</Alert>}
        {status.error && <Alert variant="danger">{status.error}</Alert>}
        {status.success ? (
          <Alert variant="success">Contraseña actualizada. Serás redirigido al login...</Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newPassword" className="mb-3">
              <Form.Label className="text-dark">Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label className="text-dark">Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </Form.Group>

            {/* Button in red */}
            <Button variant="danger" type="submit" className="w-100 mb-2" disabled={status.loading || !token}>
              {status.loading ? <Spinner animation="border" size="sm" /> : 'Restablecer contraseña'}
            </Button>
          </Form>
        )}

        <div className="text-center">
          {/* Link in blue, no underline */}
          <Link to="/login" className="text-primary text-decoration-none">Volver al login</Link>
        </div>
      </div>
    </Container>
  );
};

export default ResetPasswordPage;
