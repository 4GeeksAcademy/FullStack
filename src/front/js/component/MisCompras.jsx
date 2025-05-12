import React, { useState, useEffect } from 'react';

const MisCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.BACKEND_URL;

  useEffect(() => {
    const obtenerCompras = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No estás logueado.');
        setLoading(false);
        return;
      }

      try {
        const userResp = await fetch(`${backendUrl}/usuarios/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!userResp.ok) {
          throw new Error('No se pudo obtener el usuario.');
        }

        const usuario = await userResp.json();
        const userId = usuario.id;

        const comprasResp = await fetch(`${backendUrl}/compras/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!comprasResp.ok) {
          if (comprasResp.status === 404) {
            setCompras([]);
          } else {
            throw new Error('Error al obtener las compras.');
          }
        } else {
          const data = await comprasResp.json();
          setCompras(data.compras);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerCompras();
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando compras...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mis Compras</h2>
      {compras.length === 0 ? (
        <p>No has realizado ninguna compra.</p>
      ) : (
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Unidades</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {compras.flatMap((compra) =>
              Array.isArray(compra.items)
                ? compra.items.map((item, index) => (
                    <tr key={`${compra.id}-${index}`}>
                      <td>
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                        ) : (
                          <span className="text-muted">Sin imagen</span>
                        )}
                      </td>
                      <td>{item.title}</td>
                      <td>${(item.unit_price / 100).toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>{new Date(compra.payment_date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge bg-${compra.estado === 'pagado' ? 'success' : 'warning'}`}>
                          {compra.estado}
                        </span>
                      </td>
                    </tr>
                  ))
                : []
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisCompras;



