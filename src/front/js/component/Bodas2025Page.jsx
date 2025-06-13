import React from 'react';
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection2 from "../component/CategoriesSection2.jsx";
import RelatedContent from "../component/RelatedContent.jsx";
import Footer from "../component/Footer.jsx";

export function Bodas2025Page() {
  return (
    <div className="bodas2025-root">
      <LayoutHeader />
      <CategoriesSection2 />

      {/* Scoped styled content only for this section */}
      <section className="bodas2025-content">
        <style>{`
          /* Scoped Styles for Bodas2025Page Content */
          .bodas2025-root .bodas2025-content {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .bodas2025-root .bodas2025-content h1 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            color: #333;
            margin-bottom: 1.5rem;
          }
          .bodas2025-root .bodas2025-content h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #222;
          }
          .bodas2025-root .bodas2025-content p {
            text-align: justify;
            line-height: 1.6;
            color: #555;
            margin-bottom: 1rem;
          }
          .bodas2025-root .bodas2025-content .cta-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #e63946;
            color: #fff;
            font-weight: 600;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s;
          }
          .bodas2025-root .bodas2025-content .cta-link:hover {
            background-color: #c5303f;
          }
          @media (max-width: 768px) {
            .bodas2025-root .bodas2025-content {
              padding: 1rem;
            }
            .bodas2025-root .bodas2025-content h1 {
              font-size: 1.75rem;
            }
            .bodas2025-root .bodas2025-content h2 {
              font-size: 1.25rem;
            }
          }
        `}</style>

        <h1>Guía Completa para Organizar tu Boda 2025</h1>

        {/* 1. Elección de la Fecha */}
        <h2>1. Elección de la Fecha</h2>
        <p>
          Te asesoramos para elegir la fecha perfecta, teniendo en cuenta la temporada (primavera, verano, otoño o invierno), la disponibilidad de fincas y salones, y eventos locales que puedan interferir. Diseñamos un checklist con hitos clave: reserva de lugar, envío de invitaciones, pruebas de menú, contratación de proveedores y detalles finales.
        </p>

        {/* 2. Definición del Tipo de Boda */}
        <h2>2. Definición del Tipo de Boda</h2>
        <p>
          Te ayudamos a definir si prefieres una ceremonia civil al aire libre o una boda religiosa en iglesia. Te mostramos ejemplos de bodas simbólicas personalizadas y opciones de renovación de votos. Asesoramos en permisos, decoración y ambientación específica según tu estilo.
        </p>

        {/* 3. Selección del Lugar */}
        <h2>3. Selección del Lugar</h2>
        <p>
          Nos encargamos de visitar masías, fincas y salones en Madrid, Barcelona, Andalucía, Galicia y otras zonas clave para que no tengas que desplazarte. Negociamos contratos en tu nombre, gestionamos depósitos y revisamos cláusulas. Te mostramos diferentes estilos—rústico, moderno, tradicional—evaluamos capacidad, accesos y opciones de alojamiento.
        </p>

        {/* 4. Diseño del Banquete */}
        <h2>4. Diseño del Banquete</h2>
        <p>
          Elaboramos un menú de boda a medida, incorporando productos locales, opciones vegetarianas/veganas y menús sin alérgenos. Coordinamos la tarta de boda diseñada a tu gusto y organizamos la barra libre con bebidas nacionales e internacionales. Además, planificamos un cóctel de bienvenida de 1,5 horas con aperitivos creativos para que tus invitados disfruten antes del banquete.
        </p>

        {/* 5. Ceremonias y Rituales */}
        <h2>5. Ceremonias y Rituales</h2>
        <p>
          Redactamos el guión de tu ceremonia—civil o religiosa—con lecturas adaptadas a vuestra historia de amor y rituales personalizados para que cada momento sea único.
        </p>

        {/* 6. Música y Animación */}
        <h2>6. Música y Animación</h2>
        <p>
          Conectamos con DJs especializados en bodas, bandas en vivo y músicos acústicos para ambientar cada instante. Coordinamos playlists, montaje de sonido y animación infantil si es necesario.
        </p>

        {/* 7. Coordinación del “Día B” */}
        <h2>7. Coordinación del “Día B”</h2>
        <p>
          Nuestro coordinador de bodas está presente durante todo el evento: supervisa montajes, controla el timing de proveedores (catering, música, fotografía) y resuelve imprevistos. Tú solo disfrutas sin preocupaciones.
        </p>

        {/* 8. Transporte y Hospedaje */}
        <h2>8. Transporte y Hospedaje</h2>
        <p>
          Gestionamos el alquiler del coche nupcial (clásico, vintage o de lujo), traslados para novios e invitados (autobuses, minivans), y reservamos habitaciones en hoteles cercanos o en la misma finca con tarifas especiales y atención preferente. Coordinamos check-in anticipado y late check-out tras la celebración.
        </p>

        {/* Coste Aproximado */}
        <h2>Coste Aproximado de una Boda en España (2025)</h2>
        <p>
          <strong>Bodas low-cost (hasta 50 invitados):</strong> Desde 26.000 €, incluyendo lugar,Ceremonia Civil y iglesia, catering, música y coordinación.<br />
          <strong>Bodas de gama media (100–150 invitados):</strong> Entre 40.000 € y 49.000 €, con servicios de fotografía, vídeo, decoración personalizada y banquete de calidad.<br />
          <strong>Bodas de lujo (200 invitados):</strong> Desde 80.000 € en adelante, incluyendo fincas exclusivas, catering gourmet, barra libre premium, alojamiento y extras.
        </p>
        <p>
          Estos rangos pueden variar según la región (Madrid y Barcelona suelen situarse en la parte alta del mercado), la temporada (temporada alta: mayo-septiembre) y los servicios extras que elijas (decoración floral, diseño gráfico, etc.).
        </p>

        {/* Servicios Adicionales */}
        <h2>Servicios Adicionales (Opcionales)</h2>
        <p>
          – Peluquería y maquillaje extra para madrinas, familiares o invitadas.<br />
          – Hospedaje adicional para más habitaciones o estancias prolongadas.<br />
          – Transporte complementario: limusinas, minibuses de invitados, rutas turísticas para los días previos.<br />
          – Decoración floral & ambientación temática: arcos nupciales, centros de mesa, guirnaldas de luces, photocall personalizado.<br />
          – Entretenimiento extra: fotomatón, caricaturistas, músicos de jazz o cuarteto de cuerda, espectáculo de fuegos artificiales.<br />
          – Servicio de planificador virtual (app o plataforma online) para gestionar presupuestos, listas de invitados y seguimiento de tareas desde tu móvil.
        </p>
        <p>
          La <strong>asesoría es totalmente gratuita</strong>: contáctanos para recibir más información, un presupuesto detallado o resolver cualquier duda.
        </p>

        {/* Final CTA */}
        <div className="text-center mt-4">
          <a href="https://wa.me/34641363127?text=Hola%20buen%20dia%20quiero%20solicitar%20informacion%20sobre%20los%20paquetes%20de%20bodas" className="cta-link">Solicita tu asesoría gratuita</a>
        </div>
      </section>

      <RelatedContent />
      <Footer />
    </div>
  );
}

export default Bodas2025Page;




