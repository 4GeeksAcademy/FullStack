import React from 'react';
import cateringImg1 from '../../img/thomas-william-OAVqa8hQvWI-unsplash.jpg';
import cateringImg2 from '../../../../public/menu.jpg';
import cateringImg3 from '../../../../public/menus3.jpg';

export default function StyledInfoSectionMenus() {
  return (
    <article className="catering-article">
      <style>{`
        .catering-article {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: Arial, sans-serif;
          color: #444;
        }
        .catering-article h1 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #c0392b;
        }
        .catering-article p {
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .catering-article img {
          width: 100%;
          border-radius: 8px;
          margin: 1.5rem 0;
          object-fit: cover;
        }
        .catering-article h2 {
          font-size: 1.8rem;
          margin-top: 2rem;
          color: #a93226;
        }
        .catering-article ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }
        .catering-article li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .catering-article li::before {
          content: "✔";
          position: absolute;
          left: 0;
          color: #27ae60;
          font-weight: bold;
        }
      `}</style>

      <h1>Cómo En Camino al “Sí” Simplifica la Elección de tu Catering de Boda</h1>

      <p>
        En <strong>Camino al “Sí”</strong>, entendemos que el catering es mucho más que comida: es la experiencia culinaria que acompañará cada sonrisa y brindis de vuestro gran día. Por eso, ofrecemos un servicio integral que acompaña a las parejas en cada paso de la elección, contratación y personalización de su banquete de boda.
      </p>

      <h2>1. Asesoría Personalizada desde el Primer Contacto</h2>
      <p>
        Nada de búsquedas interminables ni acertijos: nuestro equipo de expertos os guía en una entrevista inicial para conocer vuestro estilo, presupuesto y preferencias gastronómicas. ¿Sois de sabores mediterráneos con toques de mar? ¿Preferís propuestas internacionales o menús temáticos (vegano, sin gluten, fusión)? A partir de vuestros gustos, nosotros buscamos y seleccionamos los caterings de confianza que mejor encajen, y organizamos degustaciones presenciales o virtuales para que toméis la decisión con total seguridad.
      </p>

      <img src={cateringImg1} alt="Banquete boda elegante" />

      <h2>2. Paquetes Flexibles y Ejemplos Orientativos</h2>
      <ul>
        <li><strong>Menú Clásico de 3 Platos</strong>: entrante fresco, carne o pescado a la carta y postre tradicional.</li>
        <li><strong>Selección Gourmet de 4 Platos</strong>: incluye un aperitivo diseñado por chef, plato principal creativo y una opción de postres de autor.</li>
        <li><strong>Estaciones Temáticas y Cóctel de Bienvenida</strong>: barras de quesos y charcutería, estaciones de sushi o finger food, acompañadas de mocktails y cócteles artesanales.</li>
      </ul>
      <p>
        Estos ejemplos pueden ajustarse en precio, número de pases y estilo para que reflejen vuestra personalidad.
      </p>

      <img src={cateringImg2} alt="Chef presentando platos" />

      <h2>3. Búsqueda y Presentación de Opciones de Catering</h2>
      <p>
        Nos encargamos de investigar disponibilidad, menús y valoraciones de cada proveedor; vosotros solo elegís cuál os convence más. Presentamos un dossier comparativo con fotos, reseñas reales y costes, para que la selección sea clara y transparente.
      </p>

      <h2>4. Coordinación Total y Tranquilidad Garantizada</h2>
      <p>
        Una vez decidido, coordinamos fechas, logística y montaje con el catering elegido. Gestionamos permisos de finca o salón, validamos la calidad de los ingredientes y supervisamos el servicio in situ el día de la boda. Así, vosotros solo tenéis que disfrutar: desde el primer bocado hasta el último brindis, nuestro equipo vela porque cada plato llegue a tiempo, caliente y con la presentación perfecta.
      </p>

      <img src={cateringImg3} alt="Estación de cócteles" />

      <p>
        Con <strong>Cómo En Camino al “Sí” Simplifica la Elección de tu Catering de Boda</strong> os ofrecemos:
      </p>
      <ul>
        <li>Atención personalizada y degustaciones a medida.</li>
        <li>Paquetes orientativos que se adaptan a cualquier estilo y presupuesto.</li>
        <li>Búsqueda y comparación de caterings para que elijáis sin esfuerzo.</li>
        <li>Gestión completa de logística y coordinación el día del evento.</li>
      </ul>

      <p>
        ¡Contactad con nosotros y haced de vuestro banquete un recuerdo inolvidable!
      </p>
    </article>
  );
}




