import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header/Header'
import Card from '../components/card/Card'
import axios from 'axios'
import Cards from '../components/card/Cards'
import '../components/card/Card.scss'
import Footer from '../components/footer/Footer'

export default function Product() {
  const [info, setInfo] = useState()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      try {
        const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
        setInfo(res?.data)
        const data = await axios.get(`https://api.escuelajs.co/api/v1/categories/${res.data.category.id}/products`)
        setData(data?.data)
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
      <main>
        <div className="container">
          {loading ? <div className='loader' style={{ marginTop: 50 }}></div> : (
            <>
              <Card title={info?.title} description={info?.description} price={info?.price} id={info?.id} img1={info?.images[0]} img2={info?.images[1]} img3={info?.images[2]} />
              <div className="cards">
                {data.map((i) => (
                  <Cards key={i?.id} title={i?.title} price={i?.price} id={i?.id} img1={i?.images[0]} img2={i?.images[1]} img3={i?.images[2]} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}