import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.scss'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { Avatar } from '@mui/material'

export default function Profile() {
  const { auth } = useContext(AuthContext)
  const [info, setInfo] = useState([])
  const ref = useRef(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const navigate = useNavigate()
  const { logOut } = useContext(AuthContext)
  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      try {
        const res = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            'Authorization': `Bearer ${auth.access_token}`
          }
        })
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

  async function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(ref.current)
    try {
      const res = await axios.put(`https://api.escuelajs.co/api/v1/users/${info.id}`, {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      })

      if (res?.status === 200) {
        location.reload()
      }

      return res
    } catch (error) {
      setError(error?.response?.data?.message)
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <section className='section'>
            {loading ? (
              <div className="outer">
                <div className='loader' style={{ marginTop: -50 }}></div>
              </div>
            ) : (
              <>
                <h2 className='section__heading'>Update Profile</h2>
                {error && <pre style={{marginBottom: 10}}>{error.toString()}</pre>}
                <div className="section__layout">
                  <div className="section__user">
                    {info && (
                      <div className="section__user--box">
                        <div className='section__img--box'>
                          <img src={info.avatar} alt="avatar" width={'80px'} height={'80px'} style={{ borderRadius: '50%' }} />
                        </div>
                        <div className='section__user--info'>
                          <h3 className='section__user--name'>Name: {info.name}</h3>
                          <p className='section__user--auth'>Email: {info.email}</p>
                          <p className='section__user--auth'>Password: {info.password}</p>
                        </div>
                      </div>
                    )}
                    <div className="section__user--logout">
                      <button className='section__btn' onClick={() => logOut()}>Logout</button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} ref={ref}>
                    <input className='section__input' type="text" name='name' placeholder='new name' defaultValue={info.name} />
                    <input className='section__input' type="email" name='email' placeholder='new email' defaultValue={info.email} />
                    <input className='section__input' autoComplete="on" type="password" name='password' placeholder='new password' defaultValue={info.password} />
                    <div className='section__btn--boxes'>
                      <button type='submit' className='section__btn--save' onClick={() => setSaveLoading(true)}>{saveLoading ? "Loading..." : "Save"}</button>
                      <button className='section__btn--back' onClick={() => navigate('/')}>Back to Homepage</button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}