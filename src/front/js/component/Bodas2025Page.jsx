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

        <h1>Guía Completa para Organizar tu Boda</h1>

        {/* 1. Elección de la Fecha */}
        <h2>1. Elección de la Fecha</h2>
        <p>
         Te asesoramos para elegir la fecha perfecta, teniendo en cuenta la temporada (primavera, verano, otoño o invierno), la disponibilidad de las mejores fincas y salones adaptados a tu gustos, para evitar que coincida con posibles eventos locales que puedan interferir con tu día tan especial. Diseñamos un checklists con hitos clave: reserva de lugar, envío de invitaciones, pruebas de menú, contratación de proveedores y detalles finales.
        </p>

        {/* 2. Definición del Tipo de Boda */}
        <h2>2. Definición del Tipo de Boda</h2>
        <p>
         Te ayudamos a definir tus preferencias: si prefieres una ceremonia civil al aire libre, una boda religiosa en la iglesia o la opción que tú prefieras. Te mostramos ejemplos de bodas simbólicas personalizadas y opciones de renovación de votos. Te asesoramos en la tramitación de permisos, decoración y ambientación específica y todo lo necesario según tu estilo.
        </p>

        {/* 3. Selección del Lugar */}
        <h2>3. Selección del Lugar</h2>
        <p>
          Nos encargamos de visitar fincas y salones en Madrid, Barcelona, Andalucía, Galicia y otras zonas clave, e informarte de todos los detalles, incluyendo fotografías y videos de cada locación, para que no tengas que desplazarte: si lo prefieres, podemos organizar una visita contigo, para que los veas directamente. Negociamos contratos en tu nombre, gestionamos depósitos y revisamos cláusulas. Te mostramos diferentes estilos (rústico, moderno, tradicional, temático, etc.), evaluamos la capacidad y aforo de cada lugar, los accesos y opciones de alojamiento para cada uno.
        </p>

        {/* 4. Diseño del Banquete */}
        <h2>4. Diseño del Banquete</h2>
        <p>
          Podemos elaborar contigo el menú nupcial, o te podemos proponer diferentes opciones acordes con tus gustos, todas a la medida, incorporando productos locales, internacionales, regionales, opciones vegetarianas/veganas y menús sin alérgenos. Te ayudamos en la selección y prueba de la tarta de bodas, enteramente a tu gusto y organizamos la barra libre con bebidas nacionales e internacionales. Además, si lo deseas, planificamos un cóctel de bienvenida, con la duración que prefieras, en el cual se ofrecerán aperitivos creativos, para sorprender gratamente a tus invitados y que lo disfruten antes del banquete.
        </p>

        {/* 5. Ceremonias y Rituales */}
        <h2>5. Ceremonias y Rituales</h2>
        <p>
          Te asesoramos completamente, y nos podemos encargar, si lo deseas, de la planificación y coordinación de todos los trámites legales (licencias, partidas, catequesis), la elección y guión del oficiante (Civil o Religioso) y los rituales tradicionales (arras, velo y lazo). Además, ofrecemos ceremonias simbólicas personalizadas (arena, velas, plantación de árbol, votos, etc.), y podemos sugerir lecturas y música de fondo. Organizamos un ensayo de 45 minutos el día previo y, de tú requerirlo, podemos realizar más ensayos según tus preferencias. Preparamos la transición al cóctel con un breve guión y música de enlace, garantizando que cada detalle refleje la historia y cultura de la pareja nupcial.
        </p>

        {/* 6. Música y Animación */}
        <h2>6. Música y Animación</h2>
        <p>
          Conectamos con DJs especializados en bodas, bandas en vivo y sistemas acústicos y equipos audiovisuales para ambientar cada instante de tu boda. Coordinamos playlists según tus gustos, montaje de sonido y animación infantil si es necesario.
        </p>

        {/* 7. Coordinación del “Día B” */}
        <h2>7. Coordinación del “Día B”</h2>
        <p>
          Durante todo el evento contarás con la presencia de uno de nuestros coordinadores de bodas, quien supervisará los montajes, controlará el timing de los proveedores (catering, música, fotografía) y resolverá los imprevistos que pudiesen presentarse, para que tú y tu pareja solo disfruten sin preocupaciones.
        </p>

        {/* 8. Transporte y Hospedaje */}
        <h2>8. Transporte y Hospedaje</h2>
        <p>
          Gestionamos el alquiler del coche nupcial (clásico, vintage, rústico, carroza o de lujo), traslados para los novios e invitados (autobuses, minivans), y reservamos habitaciones en hoteles cercanos o en la misma finca (de estar disponibles), con tarifas especiales y atención preferente. Para la mayor comodidad y confort podemos coordinar el check-in anticipado y el late check-out tras la celebración.
        </p>

        {/* Coste Aproximado */}
        <h2>Coste Aproximado de una Boda en España</h2>
        <p>
          Bodas íntimas (hasta 50 invitados): Desde 37.500 €, incluyendo lugar, ceremonia civil y religiosa, catering, música y coordinación.<br />
          Bodas medianas (100–150 invitados): Entre 65.000 € y 80.000 €, con los servicios incluidos para las Bodas Íntimas, más: servicios de fotografía, vídeo, decoración personalizada y banquete de 4 platillos.
          Bodas grandiosas (200 o más invitados): Desde 125.000 €, incluyen los servicios de la Boda Mediana y, adicionalmente, fincas exclusivas, catering con banquete de 5 platillos, barra libre con bebidas premium, alojamiento y la selección de servicios adicionales que prefieras (cotizados bajo pedido).
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




