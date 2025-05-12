import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const FormMiPerfil = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        ciudad: '',
        direccion_line1: '',
        telefono: '',
        correo: '',
        currentPassword: '',
        password: '',
        confirmPassword: ''
    });

    const [changePassword, setChangePassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [initialLoad, setInitialLoad] = useState(false);

    useEffect(() => {
        const loadUserData = () => {
            const userData = JSON.parse(localStorage.getItem('user')) || store.user;

            if (userData && !initialLoad) {
                setFormData({
                    nombre: userData.nombre || '',
                    apellido: userData.apellido || '',
                    ciudad: userData.ciudad || '',
                    direccion_line1: userData.direccion_line1 || '',
                    telefono: userData.telefono || '',
                    correo: userData.correo || '',
                    currentPassword: '',
                    password: '',
                    confirmPassword: ''
                });
                setInitialLoad(true);
            }
        };

        loadUserData();
    }, [store.user, initialLoad]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (changePassword && (name === 'password' || name === 'confirmPassword')) {
            if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
                setPasswordError('');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setPasswordError('');

        if (changePassword) {
            if (!formData.currentPassword) {
                setPasswordError('Debes ingresar tu contraseña actual');
                setLoading(false);
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                setPasswordError('Las contraseñas no coinciden');
                setLoading(false);
                return;
            }

            if (formData.password.length < 6) {
                setPasswordError('La nueva contraseña debe tener al menos 6 caracteres');
                setLoading(false);
                return;
            }
        }

        try {
            const updatedProfile = {
                nombre: formData.nombre,
                apellido: formData.apellido,
                correo: formData.correo,
                telefono: formData.telefono,
                direccion_line1: formData.direccion_line1,
                ciudad: formData.ciudad
            };

            const profileSuccess = await actions.updateUserProfile(updatedProfile);

            let passwordSuccess = true;
            if (changePassword) {
                passwordSuccess = await actions.changePassword({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.password
                });

                if (!passwordSuccess) {
                    throw new Error('Error al cambiar la contraseña. Verifica tu contraseña actual.');
                }
            }

            if (profileSuccess && passwordSuccess) {
                setSuccessMessage('Perfil actualizado correctamente. Serás redirigido al inicio en 5 segundos...');
                setChangePassword(false);
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    password: '',
                    confirmPassword: ''
                }));
            }
        } catch (error) {
            console.error('Error:', error);
            setPasswordError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-danger text-white">
                            <h3 className="mb-0 text-center">Mi Perfil</h3>
                        </div>
                        <div className="card-body">
                            {successMessage && (
                                <div className="alert alert-success d-flex justify-content-between align-items-center">
                                    <span>{successMessage}</span>
                                    <a href="/" className="btn btn-outline-secondary btn-sm ms-3 fw-bold">Ir ahora</a>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Nombre y Apellido - Ahora editables */}
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className="form-control"
                                        value={formData.nombre || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Apellido</label>
                                    <input
                                        type="text"
                                        name="apellido"
                                        className="form-control"
                                        value={formData.apellido || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        name="correo"
                                        className="form-control"
                                        value={formData.correo || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        className="form-control"
                                        value={formData.telefono || ''}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]+"
                                        placeholder="Ingresa tu número de teléfono"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Dirección</label>
                                    <input
                                        type="text"
                                        name="direccion_line1"
                                        className="form-control"
                                        value={formData.direccion_line1 || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Ciudad</label>
                                    <input
                                        type="text"
                                        name="ciudad"
                                        className="form-control"
                                        value={formData.ciudad || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="changePassword"
                                        checked={changePassword}
                                        onChange={() => setChangePassword(!changePassword)}
                                    />
                                    <label className="form-check-label" htmlFor="changePassword">
                                        Cambiar contraseña
                                    </label>
                                </div>

                                {changePassword && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Contraseña actual</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                className="form-control"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Nueva contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                minLength="6"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Confirmar contraseña</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                className="form-control"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                            {passwordError && (
                                                <div className="text-danger small">{passwordError}</div>
                                            )}
                                        </div>
                                    </>
                                )}

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-danger"
                                        disabled={loading}
                                    >
                                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormMiPerfil;