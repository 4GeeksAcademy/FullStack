import React, { useState, useEffect } from 'react';

const FormCrearServicio = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState(null);  // Estado para almacenar el userId
  const [loading, setLoading] = useState(true); // Para mostrar un mensaje de carga
  const [error, setError] = useState(null); // Estado para mostrar el error

  const categorias = [
    { id: 1, nombre: 'Viajes', ruta: '/viajes' },
    { id: 3, nombre: 'Top', ruta: '/top' },
    { id: 2, nombre: 'Belleza', ruta: '/belleza' },
    { id: 4, nombre: 'Gastronomía', ruta: '/gastronomia' },
  ];

  // Obtener el user_id del usuario logueado
  useEffect(() => {
    const obtenerUsuario = async () => {
      const token = localStorage.getItem('token');  // Suponiendo que el token se guarda en el localStorage

      if (!token) {
        alert('No estás logueado.');
        return;
      }

      console.log('Token encontrado:', token); // Verificar el token

      try {
        const response = await fetch('/usuarios/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Respuesta de la API:', response); // Verificar la respuesta de la API

        if (response.ok) {
          const data = await response.json();
          console.log('Datos del usuario:', data); // Verificar los datos obtenidos
          setUserId(data.id);  // Guardamos el user_id
        } else {
          const errorResponse = await response.json();
          console.error('Error al obtener usuario:', errorResponse);
          setError(errorResponse.msg || 'Error desconocido');
        }
      } catch (error) {
        console.error('Error en la petición de usuario:', error);
        setError('Error inesperado al obtener los datos del usuario.');
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    obtenerUsuario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('No se pudo obtener el ID del usuario.');
      return;
    }

    const categoriaSeleccionada = categorias.find(cat => cat.id === parseInt(categoryId));
    if (!categoriaSeleccionada) {
      alert('Debes seleccionar una categoría válida.');
      return;
    }

    const data = {
      buyers: null,
      category_id: categoriaSeleccionada.id,
      city: ciudad,
      descripcion,
      discountPrice: null,
      id: null,
      image: null,
      price: parseFloat(precio),
      rating: null,
      reviews: null,
      title: titulo,
      user_id: userId,  // Usamos el userId obtenido
    };

    try {
      const response = await fetch(categoriaSeleccionada.ruta, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Servicio creado correctamente.');
        setTitulo('');
        setDescripcion('');
        setPrecio('');
        setCiudad('');
        setCategoryId('');
      } else {
        alert('Error al crear el servicio.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al enviar los datos.');
    }
  };

  // Mostrar un mensaje de carga mientras obtenemos el usuario
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si hay un error, mostrarlo
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Crea tu servicio y vende con nosotros</h2>
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-light mb-5">
          <div className="mb-3">
            <label className="form-label">Título del Servicio</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio (USD)</label>
            <input
              type="number"
              className="form-control"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ciudad</label>
            <input
              type="text"
              className="form-control"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Crear Servicio
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormCrearServicio;
