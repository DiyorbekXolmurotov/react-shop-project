import React, { useState } from 'react'
import "./Card.scss"

export default function Card({ title, description, price, img1, id }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    const product = { id: id, title: title, image: img1, count: 1, price: price }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index === -1) {
      cart.push({ ...product, count: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(true);
    } else {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(false);
    }
  }

  return (
    <>
      <div className="container">
        <div className="myCard">
         <div className="myCardBox">
           <h2 className='myCard__title'>{title}</h2>
           <p className='myCard__description'>{description}</p>
         </div>
          <span className='myCard__price'>{`Price: $${price}`}</span>
          <img className='image-shop-card' max-width={'600px'} height={'400px'} src={img1} alt="shop-card" />
          <div className='card-box-btn'>
          <button className='myCard__btn--add' onClick={handleAddToCart}>{added ? "Buy Now" : "Buy"}</button>
          </div>
        </div>
        <div className="similar">
          <h2 className='similar__heading'>Similar ones</h2>
        </div>
      </div>
    </>
  )
}