import React from 'react';

export default function CookiesPolicy() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1>Política de Cookies</h1>

      <p>
        En Camino al Sí utilizamos cookies propias y de terceros para ofrecerte una experiencia más ágil,
        personalizada y segura. A continuación detallamos qué tipos de cookies empleamos, con qué finalidad
        y cómo puedes gestionarlas o deshabilitarlas.
      </p>

      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que tu navegador almacena en tu dispositivo (ordenador,
        móvil o tablet) cuando visitas una página web. Sirven para reconocer tu dispositivo y guardar cierta
        información sobre tu visita (preferencias, idioma, sesión iniciada…).
      </p>

      <h2>2. Tipos de cookies que usamos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Categoría</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nombre / Ejemplo</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Finalidad</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Estratégicas y técnicas</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><code>cookieConsent</code></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              Guardar la aceptación del banner de cookies (no pueden desactivarse desde el sitio).
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1 año</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>De preferencia</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}><code>lang</code>, <code>theme</code></td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              Recordar preferencias de idioma y apariencia (modo claro/oscuro).
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>6 meses</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>De análisis</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>_ga, _gid (Google Analytics)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              Medir de forma anónima tráfico, páginas visitadas y tiempo de navegación.
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              2 años (_ga), 24 h (_gid)
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>De marketing</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>__gads, IDE (Google Ads)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              Mostrar publicidad personalizada y evaluar campañas.
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1 – 2 años</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Redes sociales</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>fr (Facebook), __tawkuuid (Tawk.to)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              Compartir contenidos y permitir interacción (likes, comentarios, chat en vivo).
            </td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>90 días – sesión</td>
          </tr>
        </tbody>
      </table>

      <h2>3. ¿Cómo rechazar o eliminar cookies?</h2>
      <ol>
        <li>
          <strong>Desde el banner:</strong> Al cargar la web, pulsa “Rechazar” o cierra el banner para denegar
          las no esenciales.
        </li>
        <li>
          <strong>Configuración del navegador:</strong>
          <ul>
            <li>
              <strong>Chrome:</strong> Ajustes &gt; Privacidad y seguridad &gt; Cookies y datos de sitios
            </li>
            <li>
              <strong>Firefox:</strong> Preferencias &gt; Privacidad y seguridad &gt; Cookies y datos del sitio
            </li>
            <li>
              <strong>Safari (macOS):</strong> Preferencias &gt; Privacidad &gt; Gestionar datos de sitios web
            </li>
            <li>
              <strong>Edge:</strong> Configuración &gt; Privacidad, búsqueda y servicios &gt; Cookies y datos
              del sitio
            </li>
          </ul>
        </li>
        <li>
          <strong>Plugins y extensiones:</strong> Puedes usar uBlock Origin, Ghostery, Privacy Badger…
          para bloquear cookies y trackers.
        </li>
      </ol>

      <h2>4. Consecuencias de desactivar cookies</h2>
      <p>
        Si rechazas o eliminas cookies de análisis, marketing o preferencias, puede reducirse la
        personalización de la web (ofertas, idioma, modo claro/oscuro) y algunas funcionalidades
        (chat en vivo, auto-login, carrito de compra) podrían no funcionar correctamente.
      </p>

      <h2>5. Actualizaciones</h2>
      <p>
        Esta política de cookies puede actualizarse cuando cambie la legislación o implementemos nuevos
        servicios. La última modificación se realizó el <strong>27/06/2025</strong>.
      </p>

      <h2>Contacto</h2>
      <p>
        Para más información o consultas relacionadas con cookies, llámanos al
        <strong> +34 641 36 31 27</strong>.
      </p>
    </div>
  );
}

