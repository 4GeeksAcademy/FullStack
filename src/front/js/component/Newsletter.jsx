import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
