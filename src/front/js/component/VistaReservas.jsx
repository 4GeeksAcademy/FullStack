// src/component/VistaReservas.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

const VistaReservas = () => {
  const { store, actions } = useContext(Context);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        if (!store.user) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `${process.env.BACKEND_URL}/reservas/proveedor/${store.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener reservas");

        const data = await response.json();
        setReservas(data.reservas || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarReservas();
  }, [store.user, navigate]);

  const handleConfirmarReserva = async (reservaId) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/reservas/${reservaId}/confirmar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        // Actualizar el estado local
        setReservas(reservas.map(reserva => 
          reserva.id === reservaId ? {...reserva, estado: 'confirmado'} : reserva
        ));
      }
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Mis Reservas</h2>
        </div>
        
        <div className="card-body">
          {reservas.length === 0 ? (
            <div className="alert alert-info">
              No tienes reservas actualmente.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Servicio</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Personas</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <th scope="row">{reserva.id}</th>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={reserva.servicio_image || "https://via.placeholder.com/50"} 
                            alt={reserva.servicio_title} 
                            className="rounded me-3" 
                            width="50" 
                            height="50"
                          />
                          <div>
                            <h6 className="mb-0">{reserva.servicio_title}</h6>
                            <small className="text-muted">${reserva.precio_total}</small>
                          </div>
                        </div>
                      </td>
                      <td>{reserva.user_email}</td>
                      <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
                      <td>{reserva.cantidad_personas || 1}</td>
                      <td>
                        <span className={`badge ${reserva.estado === 'confirmado' ? 'bg-success' : 'bg-warning'}`}>
                          {reserva.estado}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/reserva/${reserva.id}`)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          {reserva.estado !== 'confirmado' && (
                            <button 
                              className="btn btn-sm btn-success"
                              onClick={() => handleConfirmarReserva(reserva.id)}
                            >
                              <i className="fas fa-check"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="card-footer text-muted">
          Total: {reservas.length} reservas
        </div>
      </div>
    </div>
  );
};

export default VistaReservas;