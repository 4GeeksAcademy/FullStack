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
          Recomendamos comenzar la planificación con al menos 3 meses de antelación para asegurar disponibilidad de finca, catering y proveedores clave.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <BsHouseDoor className="me-2" />
          ¿Cómo elijo la finca ideal?
        </Accordion.Header>
        <Accordion.Body>
          Te presentamos hasta 5 opciones según tu estilo, presupuesto y ubicación. Tras una visita virtual o presencial, seleccionas tu favorita y gestionamos la reserva.
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
          Ajustamos tu presupuesto hasta 15 días antes del evento sin coste adicional. Posterior a esa fecha, revisamos costes según el número final.
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

