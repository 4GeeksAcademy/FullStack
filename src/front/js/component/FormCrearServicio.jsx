import React, { useState, useEffect } from 'react';

const FormCrearServicio = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState(null);
  const [imagen, setImagen] = useState(''); // Nuevo campo para imagen
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = process.env.BACKEND_URL;

  const categorias = [
    { id: 1, nombre: 'Viajes', ruta: `${backendUrl}/viajes` },
    { id: 3, nombre: 'Top', ruta: `${backendUrl}/top` },
    { id: 2, nombre: 'Belleza', ruta: `${backendUrl}/belleza` },
    { id: 4, nombre: 'Gastronomía', ruta: `${backendUrl}/gastronomia` },
  ];

  useEffect(() => {
    const obtenerUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No estás logueado.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/usuarios/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data.id);
        } else {
          const errorText = await response.text();
          console.error('Respuesta del backend:', errorText);
          setError('Error al obtener los datos del usuario.');
        }
      } catch (error) {
        console.error('Error en la petición de usuario:', error);
        setError('Error inesperado al obtener los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás logueado.');
      return;
    }

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
      buyers: null, // Se deja null si no se tiene valor
      category_id: categoriaSeleccionada.id,
      city: ciudad,
      descripcion,
      discountPrice: null, // Se deja null si no se tiene valor
      id: null,
      image: imagen || null, // Enviar imagen si se proporciona
      price: parseFloat(precio),
      rating: null, // Se deja null si no se tiene valor
      reviews: null, // Se deja null si no se tiene valor
      title: titulo,
      user_id: userId, // Se toma el ID del usuario que está logueado
    };

    console.log('Datos a enviar:', data);

    try {
      const response = await fetch(categoriaSeleccionada.ruta, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Servicio creado correctamente.');
        setTitulo('');
        setDescripcion('');
        setPrecio('');
        setCiudad('');
        setCategoryId('');
        setImagen(''); // Limpiar imagen
      } else {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        alert(`Error al crear el servicio: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al enviar los datos.');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

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

          {/* Nuevo campo para la imagen */}
          <div className="mb-3">
            <label className="form-label">URL de la Imagen</label>
            <input
              type="text"
              className="form-control"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)} // Guardar la URL de la imagen
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

