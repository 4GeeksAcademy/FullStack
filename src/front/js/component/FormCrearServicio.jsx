import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalExito from './ModalExito.jsx';

const FormCrearServicio = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioOriginal, setPrecioOriginal] = useState(''); // Cambiado de precio a precioOriginal
  const [descuento, setDescuento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState(null);
  const [imagen, setImagen] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [redirectInfo, setRedirectInfo] = useState({ path: null, categoryName: null });

  const MAX_TITULO = 100;
  const MAX_DESCRIPCION = 500;
  const MAX_CIUDAD = 50;

  const navigate = useNavigate();
  const backendUrl = process.env.BACKEND_URL;

  const categorias = [
    { id: 1, nombre: 'Viajes', ruta: `${backendUrl}/viajes`, path: 'viajes' },
    { id: 3, nombre: 'Top', ruta: `${backendUrl}/top`, path: 'top' },
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
          headers: { 'Authorization': `Bearer ${token}` },
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

  const formatearPrecio = (numero) => {
    if (isNaN(numero)) return '';
    return new Intl.NumberFormat('es-ES', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numero);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titulo.length > MAX_TITULO) {
      alert(`El título no puede exceder los ${MAX_TITULO} caracteres`);
      return;
    }

    if (descripcion.length > MAX_DESCRIPCION) {
      alert(`La descripción no puede exceder los ${MAX_DESCRIPCION} caracteres`);
      return;
    }

    if (ciudad.length > MAX_CIUDAD) {
      alert(`La ciudad no puede exceder los ${MAX_CIUDAD} caracteres`);
      return;
    }

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

    const precioOriginalNumerico = parseFloat(precioOriginal);
    if (isNaN(precioOriginalNumerico)) {
      alert('Por favor ingresa un precio válido.');
      return;
    }

    // Usar el porcentaje ingresado por el usuario o 5% por defecto
    let porcentajeDescuento = descuento !== '' && !isNaN(parseFloat(descuento)) ? 
      parseFloat(descuento) : 5;
    
    // Asegurarse que el porcentaje esté en un rango válido
    porcentajeDescuento = Math.max(5, Math.min(80, porcentajeDescuento));

    // Calcular el precio con descuento (price será el precio final)
    const precioConDescuento = Math.round(precioOriginalNumerico * (1 - porcentajeDescuento / 100) * 100) / 100;

    const data = {
      buyers: null,
      category_id: categoriaSeleccionada.id,
      city: ciudad,
      descripcion,
      discountPrice: precioOriginalNumerico, // El precio original va en discountPrice
      originalPrice: precioOriginalNumerico, // Mantenemos el original también
      price: precioConDescuento, // El precio con descuento va en price
      rating: null,
      reviews: null,
      title: titulo,
      user_id: userId,
      imagen: imagen || null,
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
        setRedirectInfo({
          path: `/category/${categoriaSeleccionada.path}`,
          categoryName: categoriaSeleccionada.nombre,
          serviceData: {
            titulo: titulo,
            precioOriginal: precioOriginalNumerico,
            descuento: porcentajeDescuento,
            precioConDescuento: precioConDescuento,
            categoria: categoriaSeleccionada.nombre,
            ciudad: ciudad
          }
        });
        setMostrarModalExito(true);
        setTitulo('');
        setDescripcion('');
        setPrecioOriginal('');
        setDescuento('');
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

  // Calcular el precio con descuento en tiempo real para mostrarlo
  const precioOriginalNumerico = parseFloat(precioOriginal);
  const porcentajeDescuento = descuento !== '' && !isNaN(parseFloat(descuento)) ? 
    Math.max(5, Math.min(80, parseFloat(descuento))) : 5;
  const precioConDescuento = !isNaN(precioOriginalNumerico) ? 
    (precioOriginalNumerico * (1 - porcentajeDescuento / 100)).toFixed(2) : '';

  return (
    <>
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
                maxLength={MAX_TITULO}
                required
              />
              <small className="text-muted">{titulo.length}/{MAX_TITULO} caracteres</small>
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                maxLength={MAX_DESCRIPCION}
                rows={3}
                required
              />
              <small className="text-muted">{descripcion.length}/{MAX_DESCRIPCION} caracteres</small>
            </div>

            <div className="mb-3">
              <label className="form-label">Precio Original (USD)</label>
              <input
                type="number"
                className="form-control"
                value={precioOriginal}
                onChange={(e) => setPrecioOriginal(e.target.value)}
                min="0"
                step="0.01"
                required
              />
              {precioOriginal && !isNaN(precioOriginalNumerico) && (
                <div className="text-muted mt-1"> ${formatearPrecio(precioOriginalNumerico)}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Porcentaje de descuento</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                  min="5"
                  max="80"
                  step="1"
                  placeholder="Ej: 20"
                />
                <span className="input-group-text">%</span>
              </div>
              <small className="text-muted">
                El descuento mínimo es 5% y máximo 80%. Si no completás, aplicaremos 5%.
              </small>
              
              {/* Vista previa del precio con descuento */}
              {precioOriginal && !isNaN(precioOriginalNumerico) && (
                <div className="mt-2">
                  <div className="text-success fw-bold">
                    Precio con descuento: ${formatearPrecio(precioConDescuento)}
                  </div>
                  <div className="text-muted">
                    Descuento aplicado: {porcentajeDescuento}%
                  </div>
                  <div className="text-muted text-decoration-line-through">
                    Precio original: ${formatearPrecio(precioOriginalNumerico)}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Locación</label>
              <input
                type="text"
                className="form-control"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                maxLength={MAX_CIUDAD}
                required
              />
              <small className="text-muted">{ciudad.length}/{MAX_CIUDAD} caracteres</small>
            </div>

            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">URL de Imagen</label>
              <input
                type="text"
                className="form-control"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder='Ingresa la URL de tu imagen aquí'
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Crear Servicio
            </button>
          </form>
        </div>
      </div>
      
      <ModalExito
        show={mostrarModalExito}
        onClose={() => setMostrarModalExito(false)}
        redireccionar={() => {
          navigate(redirectInfo.path, {
            state: {
              categoryName: redirectInfo.categoryName,
              forceRefresh: true
            }
          });
        }}
        mensaje={
          <>
            <p>¡Servicio creado con éxito!</p>
            <div className="mt-3">
              <p><strong>Título:</strong> {redirectInfo.serviceData?.titulo}</p>
              <p><strong>Precio original:</strong> ${formatearPrecio(redirectInfo.serviceData?.precioOriginal)}</p>
              <p><strong>Descuento aplicado:</strong> {redirectInfo.serviceData?.descuento}%</p>
              <p className="text-success fw-bold"><strong>Precio final:</strong> ${formatearPrecio(redirectInfo.serviceData?.precioConDescuento)}</p>
              <p><strong>Categoría:</strong> {redirectInfo.serviceData?.categoria}</p>
              <p><strong>Locación:</strong> {redirectInfo.serviceData?.ciudad}</p>
            </div>
          </>
        }
      />
    </>
  );
};

export default FormCrearServicio;