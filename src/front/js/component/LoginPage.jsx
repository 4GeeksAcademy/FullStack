import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LoginPage = () => {
    const { actions } = useContext(Context);
    const [isLogin, setIsLogin] = useState(true);
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('correo_registrado');
        if (isLogin && savedEmail) {
            setCorreo(savedEmail);
            localStorage.removeItem('correo_registrado');
        }
    }, [isLogin]);

    const validarSoloLetras = (valor) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(valor);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!isLogin) {
        if (!validarSoloLetras(nombre) || !validarSoloLetras(apellido)) {
            setError('El nombre y el apellido solo pueden contener letras.');
            setIsLoading(false);
            return;
        }

        if (!nombre || !apellido || !correo || !password) {
            setError('Nombre, apellido, correo y contraseña son obligatorios.');
            setIsLoading(false);
            return;
        }
    }

    try {
        if (isLogin) {
            // Código de login...
        } else {
            console.log("Enviando datos de registro:", {
                nombre,
                apellido,
                correo,
                password: "***",
                telefono,
                direccion,
                ciudad
            });

            // Asegurarse de enviar todos los campos correctamente
            const userData = {
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                correo: correo.trim(),
                password: password,
                telefono: telefono.trim(),
                direccion: direccion.trim(),
                ciudad: ciudad.trim()
            };

            await actions.registerUser(userData);
            
            setError('¡Registro exitoso! Ahora puedes iniciar sesión.');
            setIsLogin(true);
            // Limpiar campos...
        }
    } catch (err) {
        setError(err.message || 'Error al registrarse. Por favor, inténtalo de nuevo.');
    } finally {
        setIsLoading(false);
    }
};
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="text-center mb-4">
                    <i className="bi bi-person-circle text-danger" style={{ fontSize: '3.5rem' }}></i>
                    <h2 className="mt-3 fw-bold">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
                    <p className="text-muted">
                        {isLogin ? 'Ingresa tus credenciales para continuar' : 'Crea una cuenta para comenzar'}
                    </p>
                </div>
                {error && (
                    <div className={`alert ${error.includes('éxito') ? 'alert-success' : 'alert-danger'}`}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellido</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-telephone"></i></span>
                                    <input type="tel" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Dirección</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-house-door"></i></span>
                                    <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ciudad</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
                                    <input type="text" className="form-control" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-envelope-at"></i></span>
                            <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-key"></i></span>
                            <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="5" />
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-danger w-100" disabled={isLoading}>
                        {isLoading ? (isLogin ? 'Iniciando...' : 'Registrando...') : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                    </button>
                    <div className="text-center mt-3">
                        <button type="button" className="btn btn-link text-decoration-none" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                            {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
                        </button>
                    </div>
                    {isLogin && (
                        <div className="text-center mt-2">
                            <Link to="/recuperar-contrasena" className="text-decoration-none small">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
