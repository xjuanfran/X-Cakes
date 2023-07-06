import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/buy.css';

const Buy = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cardDataString = params.get('cardData');
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  let cardData = null;

  const handleChange = () => {
    const currentItemsString = localStorage.getItem('items');
    const currentItems = currentItemsString ? JSON.parse(currentItemsString) : [];
    console.log(currentItems);

    // Search if the product already exists in the cart
    const existingItemIndex = currentItems.findIndex(item => item.title === cardData.title);

    if (existingItemIndex !== -1) {
      // If the product already exists, increase the quantity and update the total price
      currentItems[existingItemIndex].quantity += quantity;
      currentItems[existingItemIndex].totalPrice = currentItems[existingItemIndex].price * currentItems[existingItemIndex].quantity;
    } else {
      // If the product does not exist, add it to the cart with the quantity and the total price
      cardData.quantity = quantity;
      cardData.totalPrice = cardData.price * quantity;

      // Add the ID to the cardData object
      cardData.productId = cardData.productId || 0; // Assuming the ID property of the product is named 'id'

      currentItems.push(cardData);
    }

    localStorage.setItem('items', JSON.stringify(currentItems));
    navigate('/shoppingCar');
  };


  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  try {
    cardData = cardDataString ? JSON.parse(decodeURIComponent(cardDataString)) : null;
    //console.log(cardData);
  } catch (error) {
    console.error('Error parsing card data:', error);
  }

  return (
    <div>
      {cardData && (
        <div className="card-container">
          <div className="card-image">
            <img src={cardData.image} alt={cardData.title} />
          </div>
          <div className="card-details">
            <h2>{cardData.title}</h2>
            <p>{cardData.description}</p>
            <p>Precio: ${cardData.price}</p>
            <div className="quantity-container">
            <span>Cantidad</span>
              <button onClick={handleDecreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
            <button onClick={handleChange}>Añadir al carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;
