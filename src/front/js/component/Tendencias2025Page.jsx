import React from 'react';
import LayoutHeader from "../component/LayoutHeader.jsx";
import CategoriesSection2 from "../component/CategoriesSection2.jsx";
import RelatedContent from "../component/RelatedContent.jsx";
import Footer from "../component/Footer.jsx";

export function Tendencias2025Page() {
  return (
    <div className="tendencias2025-root">
      <LayoutHeader />
      <CategoriesSection2 />

      <section className="tendencias2025-content">
        <style>{`
          /* Scoped Styles for Tendencias2025Page Content */
          .tendencias2025-root .tendencias2025-content {
            max-width: 1000px;
            margin: 2rem auto;
            padding: 1rem;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .tendencias2025-root .tendencias2025-content h1 {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            color: #333;
            margin-bottom: 1.5rem;
          }
          .tendencias2025-root .tendencias2025-content h2 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #222;
          }
          .tendencias2025-root .tendencias2025-content p {
            text-align: justify;
            line-height: 1.6;
            color: #555;
            margin-bottom: 1rem;
          }
          .tendencias2025-root .tendencias2025-content ul {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
            color: #555;
          }
          .tendencias2025-root .tendencias2025-content li {
            margin-bottom: 0.5rem;
          }
          .tendencias2025-root .tendencias2025-content .cta-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #e63946;
            color: #fff;
            font-weight: 600;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s;
            margin-top: 1rem;
          }
          .tendencias2025-root .tendencias2025-content .cta-link:hover {
            background-color: #c5303f;
          }
          @media (max-width: 768px) {
            .tendencias2025-root .tendencias2025-content {
              padding: 1rem;
            }
            .tendencias2025-root .tendencias2025-content h1 {
              font-size: 1.75rem;
            }
            .tendencias2025-root .tendencias2025-content h2 {
              font-size: 1.1rem;
            }
          }
        `}</style>

        {/* 1. Título */}
        <h1>Tendencias Bodas: Inspírate y Asombra a tus Invitados</h1>

        {/* 2. Texto introductorio */}  
        <p>
          En los últimos años, en diferentes países se han desarrollado tendencias especiales para personalizar las bodas enteramente al gusto de la pareja, logrando originalidad que destaque de las ceremonias convencionales. En <strong>TU CAMINO AL SÍ</strong> podemos ayudarte a concebir una ceremonia nupcial completamente fuera de lo común, que dejará asombrados a tus invitados. Si esto es lo que estás buscando, a continuación te presentamos diferentes ideas que se han convertido en tendencias en algunos países. Nuestro equipo de expertos te asesorará en cada detalle, adaptándose a tu presupuesto y estilo para que vuestra boda sea verdaderamente irrepetible.
        </p>

        {/* 3. Secciones de tendencias */}
        <h2>1. Bodas Temáticas con Sentido</h2>
        <p>
          <strong>Boda ecológica:</strong> Más allá de reducir residuos, en 2025 vemos parejas que eligen colaborar con comunidades locales. Menús basados en productos de temporada y comercio justo, con ingredientes procedentes de huertos cercanos. Decoración realizada con bambú, lienzos reutilizados y centros florales que luego se plantan en jardines comunitarios. Invitaciones hechas en papel reciclado con semillas integradas, para que los invitados puedan plantar flores tras el evento.
        </p>
        <p>
          <strong>Boda boho chic y boda vintage:</strong> Esta combinación gana fuerza al mezclar piezas antiguas (muebles restaurados, vajilla de porcelana de segunda mano) con detalles modernos (luces de neón personalizadas, tipografías caligráficas actuales). Los tejidos naturales (lino, encaje) se entrelazan con toques metálicos vibrantes. En las bodas vintage, se incorporan cabinas de fotos analógicas o carretes de 35 mm para que los invitados capturen momentos auténticos.
        </p>
        <p>
          <strong>Boda cultural y de destino:</strong> Para 2025, las parejas están integrando bailes tradicionales, gastronomía típica y ofrendas simbólicas de la región elegida (por ejemplo, ceremonia ancestral andaluza o ritual maya). Esto da un trasfondo auténtico al evento y permite a los invitados conocer nuevas costumbres. Combina trajes regionales estilizados y música en directo de instrumentos autóctonos (guitarra flamenca, banda folclórica).
        </p>

        <h2>2. Entretenimiento Experiencial</h2>
        <p>
          <strong>Animación infantil con talleres creativos:</strong> Además de pintacaras y globoflexia, se ofrecen talleres de mini clases de cocina local o juegos de ciencia sencilla. Se zonifica el espacio en rincones lúdicos para que los niños estén entretenidos mientras los adultos disfrutan de la celebración.
        </p>
        <p>
          <strong>Bailes nupciales coreografiados:</strong> Contrata profesionales de danza para diseñar una coreografía a medida (desde tango contemporáneo hasta danza urbana). Se graban vídeos detrás de cámaras para compartir con los invitados antes del gran día y, en la ceremonia, se proyecta un montaje emotivo con la evolución de la pareja.
        </p>
        <p>
          <strong>Espacios interactivos para invitados:</strong> Cabinas de realidad virtual con recorridos 360° por la finca, rincones de “mensaje al futuro” en vídeo y juegos de búsqueda del tesoro con pistas basadas en la historia de la pareja.
        </p>

        <h2>3. Decoración y Ambientación</h2>
        <p>
          <strong>Centros florales comestibles:</strong> Composiciones con hierbas aromáticas (romero, tomillo, menta) que los invitados pueden llevarse. Ramos de flores endémicas convertidos en pequeñas plantas para regalar.
        </p>
        <p>
          <strong>Iluminación exterior con drones luminosos:</strong> Drones equipados con linternas LED trazan siluetas en el cielo; guirnaldas de luces tipo festoon y lámparas colgantes de bajo consumo crean un ambiente acogedor.
        </p>
        <p>
          <strong>Corners multisensoriales:</strong> Un “Flower Wall” interactivo, mesas de especias aromáticas y máquinas de niebla ligera para un toque de misterio.
        </p>

        <h2>4. Fotografía y Recuerdos</h2>
        <p>
          <strong>Reportaje preboda en localizaciones emblemáticas:</strong> Sesiones en playas, montañas o rincones únicos; comparte microclips en redes para generar expectación.
        </p>
        <p>
          <strong>Álbum interactivo:</strong> Códigos QR que reproducen vídeos al escanear las fotografías y playlists seleccionadas por la pareja para una experiencia sonora.
        </p>
        <p>
          <strong>Cabina retrofuturista:</strong> Fondo sencillo, impresiones al instante con marcos art déco y filtros “vintage” para un recuerdo cinematográfico.
        </p>

        <h2>5. Experiencias Gastronómicas</h2>
        <ul>
          <li><strong>Candy bar temática:</strong> Dulces de todo el mundo con carteles que cuentan su origen.</li>
          <li><strong>Tarta interactiva:</strong> Varias capas de sabor con estaciones de degustación guiadas por un pastelero.</li>
          <li><strong>Menús multisensoriales:</strong> Platos que cambian de color o liberan aromas al destapar.</li>
        </ul>

        <h2>6. Prácticas de Bienestar y Relajación</h2>
        <p>
          Carpa con sillones masajeadores y zona de tés e infusiones para que todos recarguen energía antes de la fiesta.
        </p>
        <p>
          Talleres de mindfulness y yoga al amanecer para relajarse antes del gran día.
        </p>

        <h2>7. Tecnología y Conectividad</h2>
        <p>
          <strong>Invitaciones digitales:</strong> Enlaces para confirmar asistencia, ver vídeos y explorar mapas de la finca.
        </p>
        <p>
          <strong>Streaming en vivo:</strong> Cámaras de alta definición y chat en directo para invitados remotos.
        </p>
        <p>
          <strong>App de la boda:</strong> Itinerario digital y notificaciones push con recordatorios y sorpresas.
        </p>

        <h2>8. Sostenibilidad y Responsabilidad Social</h2>
        <p>
          Proveedores locales y cubertería reutilizable para reducir la huella de carbono.
        </p>
        <p>
          Donaciones solidarias y kits reutilizables como detalle para concienciar sobre el uso responsable de recursos.
        </p>

        <h2>9. Paquetes Personalizados</h2>
        <p>
          <strong>Gold (hasta 50 invitados):</strong> Ceremonia, aperitivo, plato principal, postre, cóctel de bienvenida y barra libre.<br/>
          <strong>Platinum (hasta 100 invitados):</strong> Gold + menú de 3 platos, mixología básica y hospedaje para 5 habitaciones.<br/>
          <strong>Emerald (hasta 150 invitados):</strong> Platinum + menú gourmet de 4 platos, maquillaje y fotografía profesional.<br/>
          <strong>Diamond (hasta 200 invitados):</strong> Emerald + maridaje de vinos, alojamientos adicionales y limusina.
        </p>

        <div className="text-center">
          <a
            href="https://wa.me/34641363127?text=Hola%20buen%20día%20quiero%20información%20sobre%20los%20paquetes%20de%20bodas"
            className="cta-link"
          >
            Solicita tu asesoría gratuita
          </a>
        </div>
      </section>

      <RelatedContent />
      <Footer />
    </div>
  );
}

export default Tendencias2025Page;


