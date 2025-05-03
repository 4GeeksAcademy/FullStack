import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormCrearServicio = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState(null);
  const [imagen, setImagen] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const backendUrl = process.env.BACKEND_URL;

  const categorias = [
    { id: 1, nombre: 'Viajes', ruta: `${backendUrl}/viajes`, path: 'viajes' },
    { id: 3, nombre: 'Top', ruta: `${backendUrl}/top`, path: 'ofertas' },
    { id: 2, nombre: 'Belleza', ruta: `${backendUrl}/belleza`, path: 'belleza' },
    { id: 4, nombre: 'Gastronomía', ruta: `${backendUrl}/gastronomia`, path: 'gastronomia' },
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

    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico)) {
      alert('Por favor ingresa un precio válido.');
      return;
    }

    const data = {
      buyers: null,
      category_id: categoriaSeleccionada.id,
      city: ciudad,
      descripcion,
      discountPrice: null,
      id: null,
      image: imagen || null,
      price: precioNumerico,
      rating: null,
      reviews: null,
      title: titulo,
      user_id: userId,
    };

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
        // Redirigir a la categoría correspondiente
        navigate(`/category/${categoriaSeleccionada.path}`, {
          state: { 
            categoryName: categoriaSeleccionada.nombre === 'Top' ? 'Top Ofertas' : categoriaSeleccionada.nombre,
            forceRefresh: true
          }
        });
        // Limpiar el formulario
        setTitulo('');
        setDescripcion('');
        setPrecio('');
        setCiudad('');
        setCategoryId('');
        setImagen('');
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
              min="0"
              step="0.01"
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

          <div className="mb-3">
            <label className="form-label">URL de la Imagen</label>
            <input
              type="text"
              className="form-control"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              placeholder="Ejemplo: https://ejemplo.com/imagen.jpg"
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