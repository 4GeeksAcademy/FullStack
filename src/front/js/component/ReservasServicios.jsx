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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.warn("Token inválido");
            navigate("/login"); // Redirigir a login si el token es inválido
          } else {
            console.error("Error al obtener los pagos");
          }
          setLoading(false);
          return;
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Respuesta del servidor no es JSON");
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);

        if (data.pagos && Array.isArray(data.pagos)) {
          setPagos(data.pagos);
        } else {
          console.error("Respuesta no contiene la estructura esperada");
        }

      } catch (error) {
        console.error("Error al cargar pagos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarPagos();
  }, [navigate]);

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
                    <th scope="col">#</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map((pago) => (
                    <tr key={pago.id}>
                      <th scope="row">{pago.id}</th>
                      <td>{pago.user_email || "N/A"}</td>
                      <td>
                        {pago.payment_date
                          ? new Date(pago.payment_date).toLocaleDateString()
                          : "Sin fecha"}
                      </td>
                      <td>
                        {pago.amount !== undefined && pago.amount !== null
                          ? `$ ${pago.amount.toLocaleString()}`
                          : "Sin monto"}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            pago.estado === "pagado" ? "bg-success" : "bg-warning"
                          }`}
                        >
                          {pago.estado}
                        </span>
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

