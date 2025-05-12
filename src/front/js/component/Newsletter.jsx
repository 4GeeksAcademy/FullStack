import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(""); // Para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener la URL del backend desde el archivo .env
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    // Verificar si la URL del backend está definida
    if (!backendUrl) {
      setError("La URL del backend no está definida.");
      return;
    }

    // Hacer la solicitud POST a la API de Flask
    try {
      const response = await fetch(`${backendUrl}/newsletter`, {
        method: "POST", // Método de la solicitud
        headers: {
          "Content-Type": "application/json", // Especificamos que los datos están en formato JSON
        },
        body: JSON.stringify({ correo: email }), // Enviar el correo como JSON
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribed(true); // Si la suscripción es exitosa
        setEmail(""); // Limpiar el campo del correo
        setTimeout(() => setSubscribed(false), 3000); // Mostrar el mensaje de éxito por 3 segundos
      } else {
        // Manejar errores si el correo ya está suscrito
        setError(data.error || "Hubo un problema al procesar tu solicitud.");
        setTimeout(() => setError(""), 3000); // Eliminar el mensaje de error después de 3 segundos
      }
    } catch (err) {
      console.error(err);
      setError("Hubo un error al conectar con el servidor.");
      setTimeout(() => setError(""), 3000); // Eliminar el mensaje de error después de 3 segundos
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-sm-10 col-md-9 col-lg-9 mx-auto px-3 px-sm-4">
          <div className="bg-dark text-white py-5 px-3 rounded">
            <div className="container text-center">
              <h3 className="fw-bold mb-4">Suscríbete a nuestro newsletter</h3>
              <p className="mb-4">
                Recibe las mejores ofertas directamente en tu correo
              </p>

              {subscribed ? (
                <div className="alert alert-success py-3 px-4 rounded d-inline-block">
                  ¡Gracias por suscribirte!
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column flex-sm-row gap-2 mx-auto"
                  style={{ maxWidth: "500px" }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    required
                    className="form-control py-3"
                  />
                  <button
                    type="submit"
                    className="btn btn-danger py-3 px-4 ms-sm-2"
                  >
                    Suscribirme
                  </button>
                </form>
              )}

              {error && (
                <div className="alert alert-danger py-3 px-4 rounded d-inline-block mt-3">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

