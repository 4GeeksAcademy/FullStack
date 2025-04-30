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
        // Obtener el ID del usuario
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

        // Obtener las compras del usuario
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
        <ul className="list-group">
          {compras.map((compra) => (
            <li key={compra.id} className="list-group-item">
              <div>
                <strong>{compra.nombre_articulo}</strong><br />
                {compra.foto_articulo && (
                  <img
                    src={compra.foto_articulo}
                    alt={compra.nombre_articulo}
                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                  />
                )}
                <br />
                <span>Precio: ${compra.monto}</span><br />
                <span>Cantidad: {compra.cantidad_articulos}</span><br />
                <span>Fecha: {new Date(compra.fecha).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisCompras;
