// src/components/FAQSection.jsx

import React from "react";
import { Container, Accordion } from "react-bootstrap";
import { BsCalendarDate, BsHouseDoor, BsHeart, BsPeople, BsChatDots } from "react-icons/bs";

const FAQSection = () => (
  <Container className="my-5">
    <h2 className="text-center mb-4">Preguntas frecuentes</h2>
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <BsCalendarDate className="me-2" />
          ¿Con cuánta antelación debo reservar?
        </Accordion.Header>
        <Accordion.Body>
          En general, cuanto antes reserves, más opciones y mejores precios encontrarás. Para la finca o salón, lo ideal es asegurar la fecha con al menos 4 – 6 meses de antelación, especialmente si tu boda será en temporada alta (primavera o verano). Proveedores como catering, fotógrafo, música o transporte suelen reservarse con 6 meses de anticipación. Si necesitas servicios adicionales (decoración, vídeo, peluquería y maquillaje), conviene confirmarlos 4 – 7 meses antes. Por último, cuestiones más puntuales como invitaciones, ramo y detalles de papelería pueden dejarse para 4 – 6 meses antes, siempre teniendo en cuenta la fecha que ya tengas bloqueada. De este modo podrás garantizar disponibilidad y negociar con calma cada aspecto de tu día.

Sin embargo, se puede planificar una boda express en tan solo 3 meses. 
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <BsHouseDoor className="me-2" />
          ¿Cómo elijo la locación ideal?
        </Accordion.Header>
        <Accordion.Body>
          Nosotros te ayudamos a encontrar la locación perfecta para tu boda, sin que tengas que preocuparte por nada. Te ayudamos a definir tu estilo (rústico, moderno o clásico) y ajustamos el presupuesto comparando tarifas y servicios incluidos. Te asesoramos para seleccionar ubicaciones accesibles, con buen aparcamiento y opciones de alojamiento para novios e invitados. Verificamos capacidad y comodidades (ceremonia, banquete, baile), así como servicios básicos y climatización, según la temporada. Visitamos las fincas por ti, y con los novios si lo desean, analizando luz, espacio y confort, para que tú sólo te dediques a disfrutar de tu gran día.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <BsHeart className="me-2" />
          ¿Puedo personalizar el menú?
        </Accordion.Header>
        <Accordion.Body>
          Por supuesto. Nuestros menús de boda son completamente a medida: platos locales, menús veganos, estaciones temáticas y opción de cata previa.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>
          <BsPeople className="me-2" />
          ¿Qué sucede si cambia el número de invitados?
        </Accordion.Header>
        <Accordion.Body>
          Aceptamos cambios en la planificación hasta 15 días antes del evento.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>
          <BsChatDots className="me-2" />
          ¿Cómo puedo contactar con un asesor?
        </Accordion.Header>
        <Accordion.Body>
          Puedes llamarnos directamente, enviarnos un WhatsApp o solicitar una videollamada desde nuestro formulario de contacto. Te acompañamos en cada paso.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </Container>
);

export default FAQSection;

