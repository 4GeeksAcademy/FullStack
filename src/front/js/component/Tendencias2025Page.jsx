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
            font-size: 1.5rem;
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
              font-size: 1.25rem;
            }
          }
        `}</style>

        <h1>Tendencias Bodas 2025: Inspírate y Asombra a tus Invitados</h1>

        <h2>1. Bodas Temáticas con Sentido</h2>
        <p>
          <strong>Boda ecológica</strong>: Más allá de reducir residuos, en 2025 vemos parejas que eligen colaborar con comunidades locales. Menús basados en productos de temporada y comercio justo, con ingredientes procedentes de huertos cercanos. Decoración realizada con bambú, lienzos reutilizados y centros florales que luego se plantan en jardines comunitarios. Invitaciones hechas en papel reciclado con semillas integradas, para que los invitados puedan plantar flores tras el evento.
        </p>
        <p>
          <strong>Boda boho chic</strong> y <strong>boda vintage</strong>: Esta combinación gana fuerza al mezclar piezas antiguas (muebles restaurados, vajilla de porcelana de segunda mano) con detalles modernos (luces de neón personalizadas, tipografías caligráficas actuales). Los tejidos naturales (lino, encaje) se entrelazan con toques metálicos vibrantes. En las bodas vintage, se incorporan cabinas de fotos analógicas o carretes de 35 mm para que los invitados capturen momentos auténticos.
        </p>
        <p>
          <strong>Boda cultural y de destino</strong>: Para 2025, las parejas están integrando bailes tradicionales, gastronomía típica y ofrendas simbólicas de la región elegida (por ejemplo, ceremonia ancestral andaluza o ritual maya). Esto da un trasfondo auténtico al evento y permite a los invitados conocer nuevas costumbres. Combina trajes regionales estilizados y música en directo de instrumentos autóctonos (guitarra flamenca, banda folclórica).
        </p>

        <h2>2. Entretenimiento Experiencial</h2>
        <p>
          <strong>Animación infantil bodas con talleres creativos</strong>: Además de pintacaras y globoflexia, se ofrecen talleres de huerto urbano, mini clases de cocina local o juegos de ciencia sencilla. Se zonifica el espacio en rincones lúdicos (laboratorio de slime ecológico, rincón de magia sostenible) para que los niños estén entretenidos y aprendan algo mientras los adultos disfrutan de la celebración.
        </p>
        <p>
          <strong>Bailes nupciales coreografiados</strong>: Contratar a profesionales de danza para diseñar una coreografía a medida del estilo de los novios (desde tango contemporáneo hasta danza urbana). El ensayo previo se convierte en parte de la experiencia: se graban vídeos detrás de cámaras para compartir con los invitados antes del gran día. En la ceremonia, se proyecta en pantallas un montaje emotivo que muestre la evolución de la pareja al compás de la música.
        </p>
        <p>
          <strong>Espacios interactivos para invitados</strong>: Cabinas de realidad virtual con experiencias de la boda (por ejemplo, un recorrido 360° por la finca antes de la llegada de los novios). Rincones de “mensaje al futuro” en vídeo donde familiares y amigos dejan deseos grabados para que la pareja los vea en cada aniversario. Juegos de scavenger hunt (búsqueda del tesoro) por toda la finca, con pistas vinculadas a anécdotas de la historia de la pareja.
        </p>

        <h2>3. Decoración y Ambientación</h2>
        <p>
          <strong>Centros florales comestibles o plantables</strong>: Composiciones que incluyen hierbas aromáticas (romero, tomillo, menta) que los invitados pueden llevarse para su cocina o jardín. Ramos de flores endémicas que, al finalizar la boda, se convierten en “kokedamas” (macetas colgantes) para colgar en casas o regalar a familiares. Esto refuerza la sostenibilidad y la conexión con la naturaleza.
        </p>
        <p>
          <strong>Iluminación exterior con drones luminosos</strong>: Fuegos artificiales silenciosos combinados con drones equipados con linternas LED de colores, que trazan figuras en el cielo (corazones, iniciales de la pareja). Además, guirnaldas artesanales hechas con papel reciclado iluminado por velas led de luz cálida, creando caminos de luz que guían a los invitados a distintos ambientes (zona de cóctel, pista de baile, zona chill‐out).
        </p>
        <p>
          <strong>Corners temáticos y rincones multisensoriales</strong>: Por ejemplo, un “Flower Wall” interactivo con aromas florales que el invitado puede pulverizar al pasar; una mesa de especias donde se ofrecen esencias para perfumar el ambiente; y una barra de hielo seco para crear niebla ligera al caer la tarde.
        </p>

        <h2>4. Fotografía y Recuerdos</h2>
        <p>
          <strong>Reportaje preboda en localizaciones emblemáticas</strong>: Sesiones que no solo incluyen paisajes naturales (playas, montañas) sino también grados de realidad aumentada: al apuntar con el móvil a un punto del entorno, aparece un filtro personalizado con gráficos que representan la historia de la pareja. Publicar antes de la boda microclips en redes para generar expectación.
        </p>
        <p>
          <strong>Álbum de boda personalizado con realidad aumentada</strong>: Al enfocar con el móvil la página que muestra una instantánea, se reproduce un breve vídeo del momento (entrada de los novios, primera mirada). Además, se incorporan códigos QR discretos que enlazan a playlists seleccionadas por la pareja para revivir la banda sonora del gran día.
        </p>
        <p>
          <strong>Cabina fotográfica instantánea retrofuturista</strong>: Con impresiones en el acto que incluyen marcos impresos con diseños art déco o motivos minimalistas. La cabina digital cuenta con filtros “vintage 8 mm” o “cine 35 mm” para que los invitados tengan fotografías con estilo cinematográfico.
        </p>

        <h2>5. Experiencias Gastronómicas</h2>
        <p>
          <strong>Candy bar boda temática</strong>: Mesas de dulces organizadas como un viaje alrededor del mundo: konfites coreanos, macarons parisinos, churros españoles y mochi japonés. Cada dulce se presenta sobre platos de cerámica artesanal de la región correspondiente, con pequeños carteles que cuentan la historia del postre.
        </p>
        <p>
          <strong>Tarta de boda interactiva</strong>: Diseñada en varias capas temáticas: la capa inferior es pastel tradicional, la intermedia es fondant comestible pintado a mano, y la superior incorpora un sistema de pequeñas cápsulas de sabor (sabores frutales, mousse de chocolate blanco). En la mesa de corte, hay estaciones de degustación en las que un pastelero explica cada sabor y su origen.
        </p>
        <p>
          <strong>Menús experienciales multi‐sensoriales</strong>: Platos que incluyen elementos sorpresa, como niebla aromática al destapar una copa, canapés que cambian de color al entrar en contacto con el aire, y postres servidos en recipientes comestibles (hojas de arroz transparentes). Además, vinos de bodegas locales maridados por un sommelier que realiza mini‐talleres en mesa para explicar notas de cata.
        </p>

        <h2>6. Prácticas de Bienestar y Relajación</h2>
        <p>
          <strong>Zona wellness para novios e invitados</strong>: Carpa con sillones masajeadores y aromaterapia suave durante el cóctel. Quiosco de zumos detox y tés herbal para que todos recarguen energía antes de la fiesta.
        </p>
        <p>
          <strong>Rituales previos a la boda</strong>: Talleres de mindfulness para relajarse y despejar la mente, actividades de yoga en grupo al amanecer para los acompañantes, y un “hornazo nupcial” (aperitivo energético) la mañana del gran día para empezar con buen pie.
        </p>

        <h2>7. Tecnología y Conectividad</h2>
        <p>
          <strong>Invitaciones digitales interactivas</strong>: En lugar del clásico save‐the‐date en papel, se envían enlaces personalizados donde los invitados pueden responder su asistencia con un clic, ver vídeos de presentación de la pareja y explorar mapas 3D de la finca o salón.
        </p>
        <p>
          <strong>Streaming en vivo de la ceremonia</strong>: Para invitados que no puedan asistir en persona, se instala un set minimalista de cámaras de alta definición y se ofrece un chat en directo moderado por un “host digital” que responde a preguntas y comparte anécdotas en tiempo real.
        </p>
        <p>
          <strong>App de la boda</strong>: Diseñada a medida, con itinerario digital, chats de mesa para que los invitados se conozcan antes de la recepción y notificaciones push con sorpresas (por ejemplo, “En 15 min inicia la pista de baile con la playlist favorita de los novios”).
        </p>

        <h2>8. Sostenibilidad y Responsabilidad Social</h2>
        <p>
          <strong>Proveedores locales y comercio justo</strong>: Contratación de fincas y salones que utilicen energías renovables, colaborando con cooperativas de la zona para reducir la huella de carbono. Vajilla y cubertería reutilizable o biodegradable.
        </p>
        <p>
          <strong>Donaciones solidarias</strong>: Al contratar el paquete, se destina un porcentaje a ONG’s que trabajan en reforestación o en proyectos sociales de la región. Se regalan como detalle un kit reutilizable (botella de acero, pajita metálica) para concienciar sobre el uso de plásticos.
        </p>
        <p>
          <strong>Compromiso con el entorno</strong>: Se plantan árboles en nombre de cada invitado tras la boda y se incluye en el dossier digital un certificado de plantación. También se promueve el transporte compartido o autobuses desde puntos clave para reducir emisiones.
        </p>

        <h2>9. Paquetes Personalizados</h2>
        <p>
          <strong>Gold (hasta 50 invitados)</strong>: Catering básico (aperitivo + plato principal + postre), ceremonia civil o religiosa, coche nupcial, cóctel de bienvenida (1,5 h) y barra libre 3 h con bebidas nacionales. Ideal para bodas íntimas con lo esencial.<br/><br/>
          <strong>Platinum (hasta 100 invitados)</strong>: Incluye Gold + menú de 3 platos, cóctel de bienvenida con estación de mixología básica, barra libre 3 h con bebidas nacionales premium y cócteles exclusivos, hospedaje para 5 habitaciones en finca o alojamiento asociado (noche anterior) y diseño e impresión de invitaciones personalizadas.<br/><br/>
          <strong>Emerald (hasta 150 invitados)</strong>: Incluye Platinum + menú de 4 platos (degustación gourmet), maquillaje profesional para novia y 4 acompañantes, fotógrafo y videógrafo profesional con cobertura completa del día, tarta de boda premium, alojamiento en finca para 5 habitaciones y estancia en hotel cercano para 3 habitaciones (noche anterior), invitaciones personalizadas de diseño e impresión de gama alta.<br/><br/>
          <strong>Diamond (hasta 200 invitados)</strong>: Incluye Emerald + maridaje de vinos, alojamiento para 5 habitaciones en finca o hotel cercano (noche anterior) y 8 habitaciones la noche de la boda, invitaciones personalizadas de diseño e impresión en papel artesanal, coordinación de entradas y salidas VIP (pista de aterrizaje privado si la finca lo permite, traslados limusina) y asesoría completa de decoración premium (flores exóticas, muebles de diseño, carpas de cristal).
        </p>

        <h2>10. Coste Aproximado de una Boda en España 2025</h2>
        <p>
          <strong>Low‐cost</strong> (hasta 50 invitados): 26 000 €<br/>
          <strong>Presupuesto Premium</strong> (100 – 150 invitados): 40 000 € – 49 000 €<br/>
          <strong>De lujo</strong> (más de 200 invitados + servicios exclusivos): 70 000 € – 100 000 € o más<br/>
          Estos rangos pueden variar según la ubicación (Madrid, Barcelona) y la temporada (temporada alta encarece un 20 % – 30 %).
        </p>

        <h2>11. Servicios Adicionales</h2>
        <p>
          Ofrecemos <strong>peluquería y maquillaje extra</strong>, <strong>hospedaje complementario</strong>, <strong>transporte VIP</strong> (autobuses lanzadera, coches eléctricos, traslados en barco si la finca está junto a un río o costa), espectáculos (caricaturistas, photobooths 360º) y <strong>coordinación de luna de miel</strong> a medida. 
          La asesoría es totalmente gratuita y aceptamos cambios hasta 15 días antes del evento. ¡Contáctanos para más información!
        </p>

        <div className="text-center">
          <a href="#/contacto" className="cta-link">Solicita tu asesoría gratuita</a>
        </div>
      </section>

      <RelatedContent />
      <Footer />
    </div>
  );
}

export default Tendencias2025Page;

