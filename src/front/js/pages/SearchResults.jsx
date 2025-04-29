import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { query } = useParams();  // Obtiene el query de la URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const url = `${process.env.BACKEND_URL}/search?query=${query}`;
        console.log('Fetching from URL:', url);  // Log para verificar la URL
        const resp = await fetch(url);
        const data = await resp.text();  // Recibe la respuesta como texto para ver si es HTML o JSON

        if (!resp.ok) {
          throw new Error(`Error en la solicitud: ${resp.status}`);
        }

        try {
          const jsonData = JSON.parse(data);  // Intenta convertir la respuesta en JSON
          setResults(jsonData);  // Si se puede convertir a JSON, actualiza el estado
        } catch (err) {
          console.error("Error al parsear JSON:", err);
          setResults([]);  // Si no es un JSON válido, muestra un array vacío
        }
      } catch (error) {
        console.error("Error:", error);
        setResults([]);  // En caso de error, muestra un array vacío
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);  // Re-ejecuta cuando cambia el valor de query

  if (loading) return <div className="container mt-5">Buscando resultados...</div>;

  return (
    <div className="container mt-5">
      <h2>Resultados para: "{query}"</h2>
      {results.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <ul className="list-group">
          {results.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.nombre}  {/* Aquí debes mostrar el nombre o el campo que sea relevante */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
