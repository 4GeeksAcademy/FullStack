import React from 'react';
import { Link } from 'react-router-dom';

export default function MoreInfoNav() {
  const items = [
    { label: 'Menús de boda', to: '/Menus' },
    { label: 'Invitaciones de boda', to: '/Invitaciones' },
    { label: 'Coches para bodas', to: '/Coches' },
    { label: 'Elección del lugar', to: '/EleccionDelLugar' },
    { label: 'Organizar invitados', to: '/ComoOrganizarATusInvitados' },
    { label: 'Informe sector nupcial', to: '/SectorNupcial' },
    { label: 'Fecha y lugares', to: '/FechaYLugares' },
    { label: 'Cómo elegir invitaciones', to: '/Invitaciones' },
    { label: 'Cómo elegir coche', to: '/Coches' }
  ];

  return (
    <section className="more-info-nav py-5">
      <style>{`
        .more-info-nav {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1rem;
          text-align: left;
        }
        .more-info-nav h3 {
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #333;
        }
        .info-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        .info-item {
          flex: 1 1 30%;
          min-width: 200px;
          display: flex;
          align-items: center;
        }
        .info-item svg {
          flex-shrink: 0;
          margin-right: 0.5rem;
          color: #28a745;
        }
        .info-item a {
          color: #0056b3;
          text-decoration: none;
          font-weight: 500;
        }
        .info-item a:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .info-item {
            flex: 1 1 45%;
          }
        }
        @media (max-width: 480px) {
          .info-item {
            flex: 1 1 100%;
          }
        }
      `}</style>

      <h3>Más información</h3>
      <div className="info-grid">
        {items.map(({ label, to }, idx) => (
          <div className="info-item" key={idx}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.485 1.929a.75.75 0 0 1 0 1.061L6.56 9.915l-3.03-3.03a.75.75 0 0 1 1.061-1.061l1.999 2 6.866-6.866a.75.75 0 0 1 1.061 0z"/>
            </svg>
            <Link to={to}>{label}</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
