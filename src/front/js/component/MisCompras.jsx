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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Compra</th>
              <th>Precio</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Unidades</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id}>
                <td>
                  {compra.items.map((item, index) => (
                    <div key={index}>
                      <strong>{item.title}</strong>
                    </div>
                  ))}
                </td>
                <td>${compra.monto / 100}</td> {/* Asegúrate de mostrar el monto en formato decimal */}
                <td>{new Date(compra.fecha).toLocaleDateString()}</td>
                <td>{compra.estado}</td>
                <td>
                  {compra.items.reduce((total, item) => total + item.quantity, 0)} {/* Sumar cantidad de todos los items */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisCompras;


