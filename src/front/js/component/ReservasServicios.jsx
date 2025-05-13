import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReservasServicios = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const backendUrl = process.env.BACKEND_URL;

  useEffect(() => {
    const cargarPagos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No hay token en localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/pagos`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (Array.isArray(data.pagos)) {
          setPagos(data.pagos);
        }
      } catch (err) {
        console.error("Error al cargar pagos:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarPagos();
  }, [backendUrl, navigate]);

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
          {pagos.length === 0 ? (
            <div className="alert alert-info">
              No tienes pagos registrados actualmente.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Cliente (email)</th>
                    <th>Servicio</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Imagen</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map(p => (
                    <tr key={`${p.id}-${p.title}`}>
                      <td>{p.id}</td>
                      <td>{p.nombre ?? "-"}</td>
                      <td>{p.apellido ?? "-"}</td>
                      <td>{p.user_email}</td>
                      <td>{p.title}</td>
                      <td>{p.quantity}</td>
                      <td>
                        {p.payment_date
                          ? new Date(p.payment_date).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>
                        {typeof p.amount === "number"
                          ? `$ ${p.amount.toLocaleString()}`
                          : "—"}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            p.estado === "pagado"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {p.estado}
                        </span>
                      </td>
                      <td>
                        {p.image_url ? (
                          <img
                            src={p.image_url}
                            alt={p.title}
                            style={{ width: 60, height: 60, objectFit: "cover" }}
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card-footer text-muted">
          Total: {pagos.length} pagos
        </div>
      </div>
    </div>
  );
};

export default ReservasServicios;


