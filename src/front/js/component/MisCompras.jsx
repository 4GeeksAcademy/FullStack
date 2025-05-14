import React, { useState, useEffect } from 'react';

const MisCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.BACKEND_URL;
  
  // Imagen por defecto
  const defaultImage = "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=aA0kj2K7ir8xAey-SaPc44r5f-MATKGN0X0ybu_A774=";

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
          <thead className="table-dark text-center align-middle">
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Unidades</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {compras.flatMap((compra) =>
              Array.isArray(compra.items)
                ? compra.items.map((item, index) => (
                    <tr key={`${compra.id}-${index}`}>
                      <td>
                        <img
                          src={item.image_url || defaultImage}
                          alt={item.title}
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = defaultImage;
                          }}
                        />
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