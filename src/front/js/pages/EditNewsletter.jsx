import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CategoryCard from "../component/CategoryCard.jsx";
import LayoutHeader from "../component/LayoutHeader.jsx";
import "../../styles/newsletter.css"

const EditNewsletter = () => {
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        published: false
    })
    const { id } = useParams();
    const [selectedServices, setSelectedServices] = useState([]);
    const [allServices, setAllServices] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (!token || !storedUser) {
            navigate('/')
        }
    }, []);

    useEffect(() => {
        const getNewsletter = async () => {
            try {
                const newsletter = await actions.getOneNewsletter(id);
                if (!newsletter) {
                    console.error("error al obtener newsletter");
                    alert('Error al obtener datos del newsletter');
                    setLoading(false);
                    navigate('/newsletter');
                }
                else {
                    setFormData({
                        title: newsletter.titulo,
                        subject: newsletter.asunto,
                        published: false
                    });

                    const serviciosSeleccionados = []

                    getAllServices().forEach(service => {
                        const match = newsletter.servicios.find(s =>
                            s.service_id === service.id && s.service_type === service.service_type
                        );
                        if (match) {
                            serviciosSeleccionados.push(service);
                        }
                    });

                    setSelectedServices(serviciosSeleccionados);

                    setLoading(false);
                }
            } catch (error) {
                console.error("Error al cargar los datos del newsletter", error);
                alert("Ocurrio un error al cargar los datos del newsletter");
                navigate('/newsletter');
            }
        }

        const loadServices = async () => {
            try {
                await Promise.all([
                    actions.cargarServiciosBelleza(),
                    actions.cargarServiciosGastronomia(),
                    actions.cargarServiciosViajes(),
                    actions.cargarServiciosOfertas(),
                    actions.cargarServiciosTop()
                ]);
            } catch (error) {
                setError('Error cargando los servicios');
            }
        };
        loadServices();
        getNewsletter();
    }, []);

    const getAllServices = () => {
        return [
            ...store.serviciosBelleza.map(s => ({ ...s, service_type: 'belleza' })),
            ...store.serviciosGastronomia.map(s => ({ ...s, service_type: 'gastronomia' })),
            ...store.serviciosViajes.map(s => ({ ...s, service_type: 'viajes' })),
            ...store.serviciosOfertas.map(s => ({ ...s, service_type: 'ofertas' })),
            ...store.serviciosTop.map(s => ({ ...s, service_type: 'top' }))
        ];
    };

    const handleServiceSelect = (service) => {
        setSelectedServices(prev =>
            prev.some(s => s.id === service.id && s.service_type === service.service_type)
                ? prev.filter(s => !(s.id === service.id && s.service_type === service.service_type))
                : [...prev, service]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.editNewsletter(selectedServices, formData.title, formData.subject, id);
        if (success) {
            setSelectedServices([])
            alert("Newsletter editado con exito");
            navigate('/newsletter');
        }
        else {
            alert("ERROR AL EDITAR NEWSLETTER");
        }
    }

    return (
        <div className="container-fluid">
            <LayoutHeader />
            <div className="container py-5">
                <div className="card shadow-lg">
                    <div className="card-header bg-danger text-white py-3">
                        <h2 className="h4 mb-0">Crear Nuevo Newsletter</h2>
                    </div>

                    <div className="card-body p-4">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success" role="alert">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label htmlFor="title" className="form-label">Titulo</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="form-control"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="subject" className="form-label">Asunto</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="form-control"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Servicios a incluir</label>
                                {loading ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Cargando...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row g-4">
                                        {
                                            getAllServices().map(service => (
                                                <div className="col-12 col-md-6 col-lg-4" key={`${service.service_type}-${service.id}`}>
                                                    <div className={`card h-100 service-card ${selectedServices.some(s => s.id === service.id && s.service_type === service.service_type) ? 'selected' : ''}`}
                                                        onClick={() => handleServiceSelect(service)}
                                                    >
                                                        <CategoryCard offer={service}
                                                            showActions={false}
                                                        >
                                                            <div className="position-absolute top-0 end-0 m-2">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={selectedServices.some(s => s.id === service.id)}
                                                                    onChange={() => { }}
                                                                />
                                                            </div>
                                                        </CategoryCard>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>

                            <div className="d-flex justify-content-between border-top pt-4">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => { setShowPreview(true) }}
                                >
                                    Vista Previa
                                </button>
                            </div>

                            <div className="mt-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger me-2"
                                    onClick={() => navigate('/')}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Guardando...' : 'Guardar Newsletter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {showPreview && (
                    <div className="modal fade show" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"> Vista Previa</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowPreview(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <h3>{formData.subject}</h3>

                                    {selectedServices.length > 0 && (
                                        <>
                                            <h5 className="mt-4">Servicios Incluidos:</h5>
                                            <div className="row g-3">
                                                {selectedServices.map(service => (
                                                    <div className="col-6" key={`preview-${service.id}`}>
                                                        <CategoryCard offer={service} showActions={false}></CategoryCard>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditNewsletter