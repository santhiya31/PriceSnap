import React from 'react';
import './ProductCard.css';
import StarRating  from './StarRating';


const placeholder = "https://via.placeholder.com/150";
const ProductCard = ({ product }) => {
  return (
    

<div className="product-card">
  <img src={product.image || placeholder} alt={product.name} />
  <h3>{product.name}</h3>
  <p className="price">₹{product.price}</p>
  <StarRating rating={product.rating || 0} />
  <h3 className="store">{product.source}</h3>
  <a href={product.link} target="_blank" rel="noopener noreferrer">
    View Product
  </a>
</div>

  );
};

export default ProductCard;
