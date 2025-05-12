import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CategoryCard from "../component/CategoryCard.jsx";
import LayoutHeader from "../component/LayoutHeader.jsx";
import Footer from "../component/Footer.jsx";
import { useNavigate } from "react-router-dom";

const ViewNewsletter = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [totalPages, setTotalPages] = useState(1);

    const [title, setTitle] = useState('');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNewsletter = async () => {
            try {
                const newsletter = await actions.getOneNewsletter(id);
                if (!newsletter) {
                    console.error('Error al mostrar newsletter');
                    alert('Error al mostrar newsletter');
                    setLoading(false);
                    navigate('/');
                } else {
                    setTitle(newsletter.titulo);
                    const serviciosNewsletter = [];

                    getAllServices().forEach(service => {
                        const match = newsletter.servicios.find(s =>
                            s.service_id === service.id &&
                            s.service_type === service.service_type
                        );
                        if (match) serviciosNewsletter.push(service);
                    });

                    setServices(serviciosNewsletter);
                    setTotalPages(Math.ceil(serviciosNewsletter.length / itemsPerPage));
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error al cargar newsletter', error);
                alert("Ocurrió un error al cargar el newsletter");
                navigate('/');
            }
        };

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
                console.error('Error cargando servicios:', error);
            }
        };

        loadServices();
        getNewsletter();
    }, [id]);

    const getAllServices = () => {
        return [
            ...store.serviciosBelleza.map(s => ({ ...s, service_type: 'belleza' })),
            ...store.serviciosGastronomia.map(s => ({ ...s, service_type: 'gastronomia' })),
            ...store.serviciosViajes.map(s => ({ ...s, service_type: 'viajes' })),
            ...store.serviciosOfertas.map(s => ({ ...s, service_type: 'ofertas' })),
            ...store.serviciosTop.map(s => ({ ...s, service_type: 'top' }))
        ];
    };

    const getPaginatedServices = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return services.slice(startIndex, endIndex);
    };

    const handleViewProductDetail = (product) => {
        navigate("/product-detail", {
            state: {
                offer: {
                    ...product,
                    title: product.title || "Sin título",
                    image: product.image || "https://via.placeholder.com/300x200?text=Sin+imagen",
                    rating: product.rating || 4,
                    reviews: product.reviews || 20,
                    price: product.price || 0,
                    discountPrice: product.discountPrice || null,
                    originalPrice: product.originalPrice || null,
                    buyers: product.buyers || 0,
                    descripcion: product.descripcion || "",
                    city: product.city || ""
                },
                category: product.service_type
            }
        });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="container-fluid">
            <LayoutHeader />
            <div className="container py-5">
                <div className="row g-4">
                    <div className="card-header bg-danger text-white py-3">
                        <h2 className="h4 mb-0">{title}</h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="row g-4">
                                {getPaginatedServices().map(service => (
                                    <div className="col-12 col-md-6 col-lg-3" key={`${service.service_type}-${service.id}`}>
                                        <CategoryCard
                                            offer={{
                                                ...service,
                                                title: service.title || "Sin Título",
                                                image: service.image || "https://via.placeholder.com/300x200?text=Sin+imagen",
                                                price: service.price || 0,
                                                discountPrice: service.discountPrice || null
                                            }}
                                            onViewService={() => handleViewProductDetail(service)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Controles de paginación */}
                            {services.length > itemsPerPage && (
                                <div className="d-flex justify-content-center mt-4">
                                    <nav aria-label="Paginación">
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={handlePrevPage}
                                                >
                                                    Anterior
                                                </button>
                                            </li>

                                            <li className="page-item active">
                                                <span className="page-link">
                                                    Página {currentPage} de {totalPages}
                                                </span>
                                            </li>

                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={handleNextPage}
                                                >
                                                    Siguiente
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ViewNewsletter;