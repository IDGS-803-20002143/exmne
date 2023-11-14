import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import './App.css';

const App = () => {
    return (
        <Router>
                
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/items/:searchQuery" element={<SearchResults />} />
            <Route path="/api/item/:id" element={<ProductDetail />} />
          </Routes>
                
        </Router>
    );
};

export default App;
