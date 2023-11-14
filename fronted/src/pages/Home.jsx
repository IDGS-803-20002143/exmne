import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redireccionar a la página de resultados con la consulta de búsqueda
    navigate(`/api/items/${searchQuery}`);
  };

  return (
    <div className="container">
      <div className="card text-center" style={{ background: '#fff', padding: '20px', marginTop: '50px', borderRadius: '8px' }}>
     



        <h1 style={{ fontSize: '2.5em', marginTop: '20px' }}>
          Bazar online
        </h1>
        <div className="row justify-content-center" style={{ marginTop: '20px' }}>
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: '1px solid #0d6466', borderRadius: '4px', padding: '8px' }}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" onClick={handleSearch} style={{ backgroundColor: '#0d6466', border: '1px solid #0d6466', borderRadius: '4px' }}>
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
