import React, { useState, useEffect } from 'react';

const FormMiPerfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    ciudad: '',
    direccion: '',
    telefono: '',
    correo: ''
  });
  const [modoEdicion, setModoEdicion] = useState(false);  // Control de edición
  const [showModal, setShowModal] = useState(false);  // Control del modal
  const [originalData, setOriginalData] = useState({});  // Guardamos los datos originales

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
          setOriginalData(data);  // Guardamos los datos originales para comparación
          setFormData({
            ciudad: data.ciudad || '',
            direccion: data.direccion_line1 || '',
            telefono: data.telefono || '',
            correo: data.correo || '',
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/usuarios/me`, {
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

      if (response.ok) {
        alert('Perfil actualizado correctamente.');
        setModoEdicion(false);
        setOriginalData(formData);  // Actualizamos los datos originales al estado actual
      } else {
        const errorText = await response.text();
        console.error('Error al actualizar el perfil:', errorText);
        alert('Error al actualizar el perfil.');
      }
    } catch (error) {
      console.error('Error en la solicitud de actualización:', error);
      alert('Error inesperado.');
    }
  };

  const handleCancel = () => {
    // Resetea los campos a sus valores originales
    setFormData(originalData);
    setModoEdicion(false);
    setShowModal(false);  // Cierra el modal
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
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Guardar Cambios
              </button>
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



