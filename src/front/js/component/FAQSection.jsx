// src/components/FAQSection.jsx

import React from "react";
import { Container, Accordion } from "react-bootstrap";
import { BsController, BsTv, BsGlobe, BsSave, BsNintendoSwitch } from "react-icons/bs";

const FAQSection = () => (
  <Container className="my-5">
    <h2 className="text-center mb-4">Preguntas frecuentes</h2>
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <BsController className="me-2" />
          ¿Puedo descargar juegos en la PlayZone?
        </Accordion.Header>
        <Accordion.Body>
          Sí, la PlayZone™ incluye acceso a nuestra tienda digital desde donde podrás descargar miles de videojuegos directamente al dispositivo.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <BsTv className="me-2" />
          ¿Se puede usar en un televisor?
        </Accordion.Header>
        <Accordion.Body>
          Claro, la consola viene con salida HDMI y es compatible con cualquier TV HD o 4K. Solo conecta y empieza a jugar en pantalla grande.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <BsGlobe className="me-2" />
          ¿Está disponible en varios idiomas?
        </Accordion.Header>
        <Accordion.Body>
          Sí, la interfaz de usuario y los menús están traducidos a español, inglés, francés, alemán y más. Podrás cambiar el idioma cuando quieras.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>
          <BsSave className="me-2" />
          ¿Podré guardar mi progreso?
        </Accordion.Header>
        <Accordion.Body>
          Por supuesto. La PlayZone™ guarda automáticamente tu progreso en la nube, así que podrás retomarlo desde cualquier consola vinculada a tu cuenta.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>
          <BsNintendoSwitch className="me-2" />
          ¿Qué consolas o accesorios incluye el pack?
        </Accordion.Header>
        <Accordion.Body>
          El paquete estándar incluye la consola PlayZone™, dos mandos inalámbricos, cable HDMI, adaptador de corriente y manual de inicio rápido.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </Container>
);

export default FAQSection;
