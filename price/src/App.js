import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PriceResults from './components/PriceResults';
import './App.css';

function App() {
  const [product, setProduct] = useState('');
  const [results, setResults] = useState([]);

  // New state for sorting
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
   // Fetch default products on initial load

  useEffect(() => {
    fetchDefaultProducts();
  }, []);

  const fetchDefaultProducts = async () => {
    try {
      // You can define a default query like "popular" or empty string, or a backend API endpoint that returns default products
      const response = await fetch(`https://pricesnap.onrender.com/api/products?query`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching default products:', error);
    }
  };
  // Fetch products with sorting params
  const fetchProducts = async (searchTerm, sortByParam = '', sortOrderParam = 'asc') => {
    try {
      const response = await fetch(`https://pricesnap.onrender.com/api/products?query=${encodeURIComponent(searchTerm)}&sort_by=${sortByParam}&sort_order=${sortOrderParam}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // When search is submitted
  const handleSearch = (query) => {
    setProduct(query);
    fetchProducts(query, sortBy, sortOrder);
  };

  // When sorting options change, refetch data if a product is searched
  useEffect(() => {
  if (product) {
    fetchProducts(product, sortBy, sortOrder);
  }
}, [product, sortBy, sortOrder]);


  return (
    <div className="App">
      <h1>🛍️ PriceSnap</h1>
      <SearchBar onSearch={handleSearch} />

      {product && (
        <>
          <p>Showing results for: <strong>{product}</strong></p>

          {/* Sorting Controls */}
          <div>
            <label>
              Sort By:{' '}
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="">--None--</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </label>

            <label style={{ marginLeft: '20px' }}>
              Order:{' '}
              <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
        </>
      )}

      <PriceResults products={results} />
    </div>
  );
}

export default App;
