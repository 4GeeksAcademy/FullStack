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

      <h1>Catering y Menús a Medida</h1>

      <p>
        Ofrecemos un servicio de catering especializado para bodas, con menús orientativos de 3 o 4 platos elaborados con ingredientes locales de temporada. Estos menús sirven de guía; la selección final la realiza la pareja, eligiendo el estilo gastronómico que deseen: mediterráneo, internacional, vegetariano, vegano o sin gluten.
      </p>

      <img src={cateringImg1} alt="Banquete boda elegante" />

      <h2>Recomendaciones para Elegir tu Menú</h2>
      <ul>
        <li>Define el concepto: buffet interactivo, degustación por estaciones o servicio en mesa.</li>
        <li>Incluye opciones especiales: dietas sin gluten, veganas y alérgenos bien identificados.</li>
        <li>Combina sabores: entrantes ligeros, plato principal contundente y postres frescos.</li>
        <li>Considera el maridaje: vinos, cervezas artesanales y cócteles de bienvenida.</li>
      </ul>

      <img src={cateringImg2} alt="Chef presentando platos" />

      <h2>Proceso de Selección y Degustación</h2>
      <ul>
        <li>Agenda al menos una sesión de prueba con 2–3 combinaciones de platos.</li>
        <li>Ajusta texturas y presentaciones junto al chef durante la degustación.</li>
        <li>Valora la logística: tiempos de servicio y número de invitados.</li>
      </ul>

      <h2>Personalización y Detalles</h2>
      <ul>
        <li>Estaciones de snacks artesanales y cóctel de bienvenida de 1,5 horas.</li>
        <li>Decoración culinaria: emplatados creativos y vajilla acorde al estilo.</li>
        <li>Opciones temáticas: food trucks, barras de postres o estaciones de café.</li>
      </ul>

      <img src={cateringImg3} alt="Estación de cócteles" />

      <h2>Sostenibilidad y Responsabilidad</h2>
      <ul>
        <li>Minimiza desperdicios con porciones ajustadas.</li>
        <li>Vajilla reusable o compostable para reducir impacto ambiental.</li>
        <li>Colabora con donación de excedentes a bancos de alimentos.</li>
      </ul>

      <p>
        Con nuestra guía de catering y menús personalizados, tendrás todas las herramientas para diseñar un banquete nupcial único y memorable. ¡Empieza hoy a planificar el menú de tu boda perfecta!
      </p>
    </article>
  );
}


