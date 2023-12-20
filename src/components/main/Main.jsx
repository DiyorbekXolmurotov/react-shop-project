import React, { useEffect, useState } from 'react';
import Categories from '../categories/Categories';
import Cards from '../card/Cards';
import axios from 'axios';
import "./Main.scss"
import { useSearchParams } from 'react-router-dom';

export default function Main() {
  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()
  let minPrice = 0;
  let maxPrice = Number.MAX_SAFE_INTEGER

  useEffect(() => {
    setLoading(true)

    async function fetchData() {
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/products")
        setInfo(res?.data)
        return res
      } catch (error) {
        setError(error?.response?.data?.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const filteredProducts = () => {
    let filtered = info
    if (searchParams.get("title")) {
      filtered = info.filter((item) => {
        return item.title.toLowerCase().includes(searchParams.get("title").toLowerCase());
      });
    }

    if (searchParams.get("price_min")) {
      const priceMin = parseInt(searchParams.get("price_min"));
      if (Number.isFinite(priceMin)) {
        minPrice = priceMin;
      }
    }

    filtered = filtered.filter((item) => {
      return item.price >= minPrice;
    });



    if (searchParams.get("price_max")) {
      const priceMax = parseInt(searchParams.get("price_max"));
      if (Number.isFinite(priceMax)) {
        maxPrice = priceMax;
      }
    }

    filtered = filtered.filter((item) => {
      return item.price <= maxPrice;
    });

    filtered = filtered.filter((item) => {
      return item.price >= minPrice && item.price <= maxPrice;
    });

    return <>{filtered.map((i) => (
      <Cards
        key={i?.id}
        title={i?.title}
        price={i?.price}
        img1={i?.images[0]}
        img2={i?.images[1]}
        img3={i?.images[2]}
        id={i?.id}
      />
    ))}</>
  }

  return (
    <>
      <main>
        <div className="container">
          <Categories />
            <div className="cards">
              {info && filteredProducts()}
            </div>
        </div>
      </main>
    </>
  )
}