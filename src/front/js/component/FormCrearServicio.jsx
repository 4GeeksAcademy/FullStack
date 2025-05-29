import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalExito from './ModalExito.jsx';

const FormCrearServicio = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [titulo2, setTitulo2] = useState('');
  const [descripcion2, setDescripcion2] = useState('');
  const [titulo3, setTitulo3] = useState('');
  const [descripcion3, setDescripcion3] = useState('');
  const [precioOriginal, setPrecioOriginal] = useState('');
  const [descuento, setDescuento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId, setUserId] = useState(null);
  const [imagen, setImagen] = useState('');
  const [imagen2, setImagen2] = useState('');
  const [imagen3, setImagen3] = useState('');
  const [imagen4, setImagen4] = useState('');
  const [imagen5, setImagen5] = useState('');
  const [loading, setLoading] = useState(true);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [redirectInfo, setRedirectInfo] = useState({ path: null, categoryName: null, serviceData: {} });

  const MAX_TITULO = 100;
  const MAX_DESCRIPCION = 500;
  const MAX_CIUDAD = 50;
  const defaultImage = "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=aA0kj2K7ir8xAey-SaPc44r5f-MATKGN0X0ybu_A774=";
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
      if (!token) { setLoading(false); return; }
      try {
        const res = await fetch(`${backendUrl}/usuarios/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserId(data.id);
        }
      } finally {
        setLoading(false);
      }
    };
    obtenerUsuario();
  }, []);

  const formatearPrecio = numero => {
    if (isNaN(numero)) return '';
    return new Intl.NumberFormat('es-ES',{ style: 'decimal', minimumFractionDigits:2, maximumFractionDigits:2 }).format(numero);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (titulo.length > MAX_TITULO) return alert(`Título máximo ${MAX_TITULO} caracteres`);
    if (descripcion.length > MAX_DESCRIPCION) return alert(`Descripción máximo ${MAX_DESCRIPCION} caracteres`);
    if (ciudad.length > MAX_CIUDAD) return alert(`Ciudad máximo ${MAX_CIUDAD} caracteres`);
    const token = localStorage.getItem('token');
    if (!token) return alert('No logueado');
    if (!userId) return alert('No se obtuvo ID de usuario');
    const cat = categorias.find(c => c.id === +categoryId);
    if (!cat) return alert('Selecciona categoría válida');

    const orig = parseFloat(precioOriginal);
    if (isNaN(orig)) return alert('Precio inválido');
    let pct = descuento!=='' && !isNaN(+descuento) ? +descuento : 5;
    pct = Math.max(5, Math.min(80, pct));
    const price = Math.round(orig * (1 - pct/100) * 100)/100;

    const payload = {
      title: titulo,
      descripcion,
      title2: titulo2,
      descripcion2,
      title3: titulo3,
      descripcion3,
      city: ciudad,
      discountPrice: orig,
      originalPrice: orig,
      price,
      rating: null,
      reviews: null,
      buyers: null,
      user_id: userId,
      category_id: cat.id,
      image: imagen.trim()||defaultImage,
      image2: imagen2.trim()||defaultImage,
      image3: imagen3.trim()||defaultImage,
      image4: imagen4.trim()||defaultImage,
      image5: imagen5.trim()||defaultImage
    };

    try {
      const res = await fetch(cat.ruta, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.text();
        return alert(`Error ${res.status}: ${err}`);
      }
      // éxito
      setRedirectInfo({
        path: `/category/${cat.path}`,
        categoryName: cat.nombre,
        serviceData: { 
          titulo, precioOriginal: orig, descuento: pct, precioConDescuento: price,
          categoria: cat.nombre, ciudad, imagen: payload.image
        }
      });
      setMostrarModalExito(true);
      // reset form
      setTitulo(''); setDescripcion(''); setTitulo2(''); setDescripcion2('');
      setTitulo3(''); setDescripcion3('');
      setPrecioOriginal(''); setDescuento(''); setCiudad(''); setCategoryId('');
      setImagen(''); setImagen2(''); setImagen3(''); setImagen4(''); setImagen5('');
    } catch(err) {
      console.error(err);
      alert('Error enviando datos');
    }
  };

  if (loading) return <div>Cargando...</div>;

  const origNum = parseFloat(precioOriginal)||0;
  const pct = descuento!==''&& !isNaN(+descuento)? Math.max(5,Math.min(80,+descuento)) : 5;
  const finalP = (origNum*(1-pct/100)).toFixed(2);

  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Crea tu servicio y vende con nosotros</h2>
          <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-light mb-5">
            
            {/* Título, Descripción */}
            <div className="mb-3">
              <label className="form-label">Título del Servicio</label>
              <input type="text" className="form-control" value={titulo} onChange={e=>setTitulo(e.target.value)} maxLength={MAX_TITULO} required/>
              <small className="text-muted">{titulo.length}/{MAX_TITULO}</small>
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" rows={3} value={descripcion} onChange={e=>setDescripcion(e.target.value)} maxLength={MAX_DESCRIPCION} required/>
              <small className="text-muted">{descripcion.length}/{MAX_DESCRIPCION}</small>
            </div>

            {/* Título2, Descripción2 */}
            <div className="mb-3">
              <label className="form-label">Título Secundario (Título 2)</label>
              <input type="text" className="form-control" value={titulo2} onChange={e=>setTitulo2(e.target.value)} maxLength={MAX_TITULO}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción Secundaria (Descripción 2)</label>
              <textarea className="form-control" rows={2} value={descripcion2} onChange={e=>setDescripcion2(e.target.value)} maxLength={MAX_DESCRIPCION}/>
            </div>

            {/* Título3, Descripción3 */}
            <div className="mb-3">
              <label className="form-label">Tercer Título (Título 3)</label>
              <input type="text" className="form-control" value={titulo3} onChange={e=>setTitulo3(e.target.value)} maxLength={MAX_TITULO}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Tercera Descripción (Descripción 3)</label>
              <textarea className="form-control" rows={2} value={descripcion3} onChange={e=>setDescripcion3(e.target.value)} maxLength={MAX_DESCRIPCION}/>
            </div>

            {/* Precio original y descuento */}
            <div className="mb-3">
              <label className="form-label">Precio Original (USD)</label>
              <input type="number" className="form-control" value={precioOriginal} onChange={e=>setPrecioOriginal(e.target.value)} min="0" step="0.01" required/>
              {precioOriginal && <div className="text-muted mt-1">${formatearPrecio(origNum)}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Porcentaje de descuento</label>
              <div className="input-group">
                <input type="number" className="form-control" value={descuento} onChange={e=>setDescuento(e.target.value)} min="5" max="80" step="1" placeholder="Ej: 20"/>
                <span className="input-group-text">%</span>
              </div>
              {precioOriginal && (
                <div className="mt-2">
                  <div className="text-success fw-bold">Final: ${formatearPrecio(finalP)}</div>
                  <div className="text-muted">Descuento: {pct}%</div>
                  <div className="text-muted text-decoration-line-through">Original: ${formatearPrecio(origNum)}</div>
                </div>
              )}
            </div>

            {/* Locación, Categoría */}
            <div className="mb-3">
              <label className="form-label">Locación</label>
              <input type="text" className="form-control" value={ciudad} onChange={e=>setCiudad(e.target.value)} maxLength={MAX_CIUDAD} required/>
              <small className="text-muted">{ciudad.length}/{MAX_CIUDAD}</small>
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select className="form-select" value={categoryId} onChange={e=>setCategoryId(e.target.value)} required>
                <option value="">Selecciona categoría</option>
                {categorias.map(cat=>(
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>

            {/* Imágenes 1–5 */}
            <div className="mb-3">
              <label className="form-label">URL Imagen Principal</label>
              <input type="text" className="form-control" value={imagen} onChange={e=>setImagen(e.target.value)} placeholder="Opcional"/>
            </div>
            <div className="mb-3">
              <label className="form-label">URL Imagen 2</label>
              <input type="text" className="form-control" value={imagen2} onChange={e=>setImagen2(e.target.value)} placeholder="Opcional"/>
            </div>
            <div className="mb-3">
              <label className="form-label">URL Imagen 3</label>
              <input type="text" className="form-control" value={imagen3} onChange={e=>setImagen3(e.target.value)} placeholder="Opcional"/>
            </div>
            <div className="mb-3">
              <label className="form-label">URL Imagen 4</label>
              <input type="text" className="form-control" value={imagen4} onChange={e=>setImagen4(e.target.value)} placeholder="Opcional"/>
            </div>
            <div className="mb-3">
              <label className="form-label">URL Imagen 5</label>
              <input type="text" className="form-control" value={imagen5} onChange={e=>setImagen5(e.target.value)} placeholder="Opcional"/>
            </div>

            <button type="submit" className="btn btn-primary w-100">Crear Servicio</button>
          </form>
        </div>
      </div>

      <ModalExito
        show={mostrarModalExito}
        onClose={()=>setMostrarModalExito(false)}
        redireccionar={()=>{
          navigate(redirectInfo.path, {
            state: { categoryName: redirectInfo.categoryName, forceRefresh: true }
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
              {redirectInfo.serviceData?.imagen && (
                <div className="mt-2">
                  <p><strong>Imagen:</strong></p>
                  <img 
                    src={redirectInfo.serviceData.imagen} 
                    alt="Servicio" 
                    className="img-thumbnail" 
                    style={{ maxHeight: '100px' }}
                    onError={e=>{e.target.src=defaultImage}}
                  />
                </div>
              )}
            </div>
          </>
        }
      />
    </>
  );
};

export default FormCrearServicio;
