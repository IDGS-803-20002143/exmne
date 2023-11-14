import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const { searchQuery } = useParams();
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/items?q=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error(`La solicitud no fue exitosa: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
      setTotalResults(data.length);
      console.log(data);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  }, [searchQuery]);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/api/items/${searchInput}`);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, searchQuery]); // Corregir la dependencia a fetchData y searchQuery

  return (
    <div className="container mt-4" style={{ background: '#c6dfb6', padding: '20px' }}>
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ border: '1px solid #0d6466', borderRadius: '4px', padding: '8px' }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
                style={{ backgroundColor: '#0d6466', border: '1px solid #0d6466', borderRadius: '4px', marginLeft: '-1px' }}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="header text-center mb-4" style={{ color: '#0d6466', fontSize: '2em' }}>{`Resultados para: ${searchQuery}`}</h1>
      <p className="text-center" style={{ color: '#0d6466' }}>{`Total de objetos encontrados: ${totalResults}`}</p>
      <div className="row" style={{ overflowX: 'auto' }}>
        {results.map((product) => (
          <div className="col-md-12 mb-4" key={product.id}>
            <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="card-img-top"
                />
            <div className="card" style={{ border: '1px solid #0d6466', borderRadius: '8px' }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#0d6466', fontSize: '1.2em' }}>{product.title}</h5>
                <p className="card-text" style={{ color: '#454545' }}>{product.description}</p>
                <p className="card-text" style={{ color: '#0d6466', fontWeight: 'bold' }}>{`Precio: $${product.price}`}</p>
                <p className="card-text" style={{ color: '#0d6466' }}>{`Categoria: ${product.category}`}</p>
                <p className="card-text" style={{ color: '#0d6466' }}>{`Rating: ${product.rating}`}</p>
              </div>
              <div className="card-footer">
                <a
                  href={`/api/item/${product.id}`}
                  className="btn btn-primary"
                  style={{ backgroundColor: '#0d6466', border: '1px solid #0d6466', borderRadius: '4px' }}
                >
                  Ver detalle
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
