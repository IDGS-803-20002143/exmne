import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/item/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/api/items/${searchInput}`);
  };

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-md-6 offset-md-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <br />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="header text-center">{product.title}</h2>
        <div className="row">
          <div className="col-md-6">
            <img src={product.thumbnail} alt={product.title} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Precio: ${product.price}</p>
                <p className="card-text">Descuento: {product.discountPercentage}%</p>
                <p className="card-text">Rating: {product.rating}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <p className="card-text">Marca: {product.brand}</p>
                <p className="card-text">Categoría: {product.category}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">Comprar ahora</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
