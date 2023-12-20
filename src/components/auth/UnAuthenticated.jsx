import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'

export default function UnAuthenticated() {
  const [tab, setTab] = useState('login')
  return (
    <>
      <div style={{ display: `${tab === 'register' ? 'block' : 'none'}` }}>
        <Register onRegister={() => setTab('login')} />
      </div>
      <div style={{ display: `${tab === 'login' ? 'block' : 'none'}` }}>
        <Login />
      </div>
      <div className='container_small'>
        <div className="btn-box">
          <button className='btn-auth' onClick={() => setTab('register')}>Register</button>
          <button className='btn-auth' onClick={() => setTab('login')}>Login</button>
        </div>
      </div>
    </>
  )
}