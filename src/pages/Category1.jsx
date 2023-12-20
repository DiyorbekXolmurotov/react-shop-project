import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from '../components/card/Cards'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function Category1() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState([])
  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/categories/1/products")
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

  return (
    <>
      <Header />
      {loading ? <div className="loader" style={{ marginTop: 50 }}></div> : (
        <div className="cards">
          {info.map((i) => (
            <Cards key={i?.id} id={i?.id} title={i?.title} price={i?.price} img1={i?.images[0]} img2={i?.images[1]} img3={i?.images[2]} />
          ))}
        </div>
      )}
      <Footer />
    </>
  )
}