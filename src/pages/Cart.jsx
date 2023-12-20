import React, { useEffect, useState } from 'react'
import './Cart.scss'
import Header from '../components/header/Header';
import icon from '../assets/delete.png'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  function handleDelete(id) {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }

  function handleQuantityChange(id, newCount) {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, count: newCount };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }

  function calculateTotal() {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="container">
          <h2 className="cart__title">Your Cart</h2>
          <h3 style={{ textAlign: 'center', fontSize: '22px' }}>Now cart</h3>
          <button className='cart__btn' onClick={() => navigate('/')}>Back to Homepage</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="cart__title">Your Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id}>
            <div className="cart">
              <div className="cart__infos">
                <img style={{ borderRadius: '8px' }} src={item.image} alt={item.title} width={100} height={100} />
                <div className="cart__product--info">
                  <h4 className="cart__name">{item.title}</h4>
                  <p className="cart__price">{`Price: $${item.price}`}</p>
                </div>
              </div>
              <div className="cart__counter">
                <div className="input-group">
                  <button
                    onClick={() => handleQuantityChange(item.id, Math.max(1, item.count - 1))}
                    className="button-minus"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.count}
                    readOnly
                    className="quantity-field"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, item.count + 1)}
                    className="button-plus"
                  >
                    +
                  </button>
                </div>
                <div>
                  <button className="cart__delete" onClick={() => handleDelete(item.id)}>
                    <img src={icon} alt="delete" width={25} height={25} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <span className='span-total-price'></span>
        <div className="cart__total">
          <h4>Total:</h4>
          <p>{`$${calculateTotal()}`}</p>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className='cart__btn--buy'>Clearance</button>
      </div>
      <Footer />
    </>
  );
}