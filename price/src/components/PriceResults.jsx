import React from 'react';
import ProductCard from './ProductCard';
import './PriceResults.css';

const PriceResults = ({ products }) => {
  return (
    <div className="results-container">
      {products.length === 0 ? (
        <p>No products found. Try a different search.</p>
      ) : (
        products.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))
      )}
    </div>
  );
};

export default PriceResults;
