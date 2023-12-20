import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import "./Card.scss"

export default function Cards({ title, price, img1, id }) {
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
      <div className='card__title'>
      <a className="card" href={`/product/${id}`}>
          <Card className='card-template' sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={img1}
                alt="image-shop"
              />
              <CardContent>
              <div className="card-content">
                <h3>{title}</h3>
                <span className='card__price'>{`$${price}`}</span>
              </div>
              </CardContent>
            </CardActionArea>
            </Card>
            </a>
            <CardActions>
            <button onClick={handleAddToCart} className='card__btn'>{added ? "Buy Now" : "Buy"}</button>
            </CardActions>
        </div>
        </div>
    </>
  )
}