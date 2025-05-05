import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const FormMiPerfil = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        ciudad: '',
        direccion_line1: '',
        telefono: '',
        correo: '',
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
                    ciudad: userData.ciudad || '',
                    direccion_line1: userData.direccion_line1 || '',
                    telefono: userData.telefono || '',
                    correo: userData.correo || '',
                    password: '',
                    confirmPassword: ''
                });
                setInitialLoad(true);
            }
        };

        loadUserData();
    }, [store.user, initialLoad]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (changePassword && (name === 'password' || name === 'confirmPassword')) {
            if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
                setPasswordError('Las contraseñas no coinciden');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');

        if (changePassword) {
            if (formData.password !== formData.confirmPassword) {
                setPasswordError('Las contraseñas no coinciden');
                setLoading(false);
                return;
            }
            if (formData.password.length < 6) {
                setPasswordError('La contraseña debe tener al menos 6 caracteres');
                setLoading(false);
                return;
            }
        }

        try {
            const updatedProfile = {
                telefono: formData.telefono,
                direccion_line1: formData.direccion_line1,
                ciudad: formData.ciudad
            };

            const profileSuccess = await actions.updateUserProfile(updatedProfile);

            let passwordSuccess = true;
            if (changePassword) {
                passwordSuccess = await actions.changePassword({
                    correo: formData.correo,
                    password: formData.password
                });
            }

            if (profileSuccess && passwordSuccess) {
                setSuccessMessage('Perfil actualizado correctamente');
                setChangePassword(false);
                setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            }
        } catch (error) {
            console.error('Error:', error);
            setPasswordError('Error al actualizar el perfil');
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
                                <div className="alert alert-success">{successMessage}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={formData.correo || ''}
                                        disabled
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
                                            {passwordError && <div className="text-danger small">{passwordError}</div>}
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