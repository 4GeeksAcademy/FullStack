import React, { useState, useEffect } from 'react';

const FormMiPerfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    ciudad: '',
    direccion: '',
    telefono: '',
    correo: '',
    password: '',
    confirmPassword: ''
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [changePassword, setChangePassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const token = localStorage.getItem('token');
  const backendUrl = process.env.BACKEND_URL;

  useEffect(() => {
    const obtenerUsuario = async () => {
      if (!token) {
        console.error("Token no encontrado");
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/usuarios/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get("content-type");

        if (!response.ok) {
          const text = await response.text();
          console.error("Error al obtener los datos del usuario:", response.status, text);
          return;
        }

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setUsuario(data);
          setOriginalData(data);
          setFormData({
            ciudad: data.ciudad || '',
            direccion: data.direccion_line1 || '',
            telefono: data.telefono || '',
            correo: data.correo || '',
            password: '',
            confirmPassword: ''
          });
        } else {
          const text = await response.text();
          console.error("Respuesta inesperada del servidor:", text);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    obtenerUsuario();
  }, [token, backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Validar contraseñas si estamos cambiando la contraseña
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
    
    // Validar contraseñas si estamos cambiando la contraseña
    if (changePassword) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError('Las contraseñas no coinciden');
        return;
      }
      if (formData.password.length < 6) {
        setPasswordError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
    }

    try {
      // Primero actualizar los datos del perfil
      const profileResponse = await fetch(`${backendUrl}/usuarios/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ciudad: formData.ciudad,
          direccion: formData.direccion,
          telefono: formData.telefono,
        }),
      });

      if (!profileResponse.ok) {
        const errorText = await profileResponse.text();
        console.error('Error al actualizar el perfil:', errorText);
        alert('Error al actualizar el perfil.');
        return;
      }

      // Si el usuario quiere cambiar la contraseña
      if (changePassword) {
        const passwordResponse = await fetch(`${backendUrl}/editar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            correo: formData.correo,
            password: formData.password
          }),
        });

        if (!passwordResponse.ok) {
          const errorText = await passwordResponse.text();
          console.error('Error al actualizar la contraseña:', errorText);
          alert('Error al actualizar la contraseña.');
          return;
        }
      }

      alert('Perfil actualizado correctamente.');
      setModoEdicion(false);
      setOriginalData(formData);
      setChangePassword(false);
      setShowModal(false);
    } catch (error) {
      console.error('Error en la solicitud de actualización:', error);
      alert('Error inesperado.');
    }
  };

  const handleCancel = () => {
    setFormData({
      ciudad: originalData.ciudad || '',
      direccion: originalData.direccion_line1 || '',
      telefono: originalData.telefono || '',
      correo: originalData.correo || '',
      password: '',
      confirmPassword: ''
    });
    setModoEdicion(false);
    setShowModal(false);
    setChangePassword(false);
    setPasswordError('');
  };

  return (
    <div className="container mt-5">
      {usuario ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Mi Perfil</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-light">
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  value={formData.correo}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  className="form-control"
                  value={formData.telefono}
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
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  className="form-control"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="changePasswordCheck"
                  checked={changePassword}
                  onChange={() => setChangePassword(!changePassword)}
                />
                <label className="form-check-label" htmlFor="changePasswordCheck">
                  Cambiar contraseña
                </label>
              </div>

              {changePassword && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Nueva Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required={changePassword}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirmar Contraseña</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required={changePassword}
                    />
                    {passwordError && <div className="text-danger">{passwordError}</div>}
                  </div>
                </>
              )}

              <div className="d-flex justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  Guardar Cambios
                </button>
              </div>
            </form>

            {/* Modal de confirmación */}
            {showModal && (
              <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Confirmar cambios</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>¿Está seguro de que desea guardar los cambios realizados?</p>
                      {changePassword && <p className="text-warning">Se cambiará su contraseña.</p>}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                      <button type="button" className="btn btn-primary" onClick={() => {
                        setShowModal(false);
                        handleSubmit();
                      }}>Guardar Cambios</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Cargando perfil...</p>
      )}
    </div>
  );
};

export default FormMiPerfil;