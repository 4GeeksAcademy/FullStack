import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import LayoutHeader from "../component/LayoutHeader.jsx";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AdminNewsletter = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchNewsletters = async () => {
        try {
            const success = await actions.getNewsletters();
            if (!success) setError('Error al cargar newsletters');
            setLoading(false);
        } catch (error) {
            handleError(error, 'Error de conexión');
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (!token || !storedUser) {
            navigate('/')
        }
    }, []);

    useEffect(() => {
        fetchNewsletters();
    }, []);

    const handleError = (error, defaultMessage) => {
        const message = error.response?.data?.message || error.message || defaultMessage;
        setError(message);
        setTimeout(() => setError(null), 5000);
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de eliminar este newsletter?',
            buttons: [
                {
                    label: 'Eliminar',
                    className: 'btn-danger',
                    onClick: async () => {
                        try {
                            setLoading(true);
                            await actions.deleteNewsletter(id);
                            await fetchNewsletters();
                        } catch (error) {
                            handleError(error, 'Error eliminando newsletter');
                        } finally {
                            setLoading(false);
                        }
                    }
                },
                {
                    label: 'Cancelar',
                    className: 'btn-outline-secondary'
                }
            ]
        });
    };

    const handleSend = (id) => {
        confirmAlert({
            title: 'Confirmar envío',
            message: '¿Estás seguro de enviar este newsletter a todos los suscriptores?',
            buttons: [
                {
                    label: 'Enviar',
                    className: 'btn-success',
                    onClick: async () => {
                        try {
                            setLoading(true);
                            await actions.sendNewsletter(id);
                            await fetchNewsletters();
                        } catch (error) {
                            handleError(error, 'Error enviando newsletter');
                        } finally {
                            setLoading(false);
                        }
                    }
                },
                {
                    label: 'Cancelar',
                    className: 'btn-outline-secondary'
                }
            ]
        });
    };

    const paginatedNewsletters = store.newsletters?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(store.newsletters?.length / itemsPerPage);

    return (
        <div className="container-fluid">
            <LayoutHeader />
            <div className="container d-flex pt-5 pb-2">
                <button
                    onClick={() => navigate('/')}
                    className="btn btn-primary me-auto"
                    aria-label="Volver al inicio"
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                </button>
                <button
                    onClick={() => navigate('/newsletter/create')}
                    className="btn btn-success"
                    aria-label="Crear nuevo newsletter"
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Nuevo Newsletter
                </button>
            </div>

            <div className="container">
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setError(null)}
                            aria-label="Cerrar alerta"
                        ></button>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-4">
                        <div
                            className="spinner-border text-primary"
                            style={{ width: '3rem', height: '3rem' }}
                            role="status"
                        >
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Título</th>
                                        <th scope="col">Asunto</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedNewsletters?.map(ns => (
                                        <tr key={ns.id}>
                                            <th scope="row">{ns.id}</th>
                                            <td className="text-truncate" style={{ maxWidth: '200px' }}>{ns.titulo}</td>
                                            <td>{ns.asunto}</td>
                                            <td>
                                                <span className={`badge ${ns.enviado ? 'bg-success' : 'bg-warning'}`}>
                                                    {ns.enviado ? 'Enviado' : 'Pendiente'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        onClick={() => handleSend(ns.id)}
                                                        className="btn btn-sm btn-outline-success"
                                                        disabled={ns.enviado || loading}
                                                        aria-label={`Enviar newsletter ${ns.titulo}`}
                                                    >
                                                        <i className="bi bi-send"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/edit-newsletter/${ns.id}`)}
                                                        className="btn btn-sm btn-primary"
                                                        disabled={loading}
                                                        aria-label={`Editar newsletter ${ns.titulo}`}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(ns.id)}
                                                        className="btn btn-sm btn-danger"
                                                        disabled={loading}
                                                        aria-label={`Eliminar newsletter ${ns.titulo}`}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <nav className="d-flex justify-content-end mt-4">
                            <ul className="pagination">
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        aria-label="Página anterior"
                                    >
                                        &laquo;
                                    </button>
                                </li>
                                <li className="page-item disabled">
                                    <span className="page-link">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                </li>
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage >= totalPages}
                                        aria-label="Página siguiente"
                                    >
                                        &raquo;
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminNewsletter;