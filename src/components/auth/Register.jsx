import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import "./Auth.scss"

export default function Register({ onRegister }) {
  const ref = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const modalRef = useRef("none")
  const { logIn } = useContext(AuthContext)

  function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(ref.current)
    setLoading(true)
    axios.post("https://api.escuelajs.co/api/v1/users/", {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: 'https://picsum.photos/100/100'
    }).then((res) => {
      res?.data;
      if (res.status === 201) {
        modalRef.current.style.display = "block"
      }
    }).then((data) => {
      if (data) {
        logIn(data)
      } else {
        setError(new Error(data?.message))
      }
    }).catch(error => setError(error?.response?.data?.message)).finally(() => {
      setLoading(false);
    })
  }

  function onModalOutsideClick(evt) {
    const el = evt.target;

    if (!el.matches(".modal")) return;

    el.style.display = "none"
  }

  document.addEventListener('click', (evt) => {
    onModalOutsideClick(evt)
  })

  return (
    <>
      <div className="container_small">
        <div className="auth">
          <h2 className='auth__heading'>Register</h2>
          {error && <pre style={{ marginBottom: 10 }}>{error.toString()}</pre>}
          <form onSubmit={handleSubmit} ref={ref}>
            <input type="text" placeholder="Name" required name="name" className='auth__input--name' />
            <input type="email" placeholder="Email" required name="email" className='auth__input--email' />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              autoComplete="on"
              className='auth__input--password'
            />
            <button className='auth__btn' type="submit">{loading ? "Loading..." : "Register"}</button>
          </form>
          <div ref={modalRef} id="myModal" className="modal">
            <div className="modal-content">
              <div className="modal-items">
                <h4 className='title-modal'>You have successfully registered. Please log in to proceed.</h4>
                <button className='btn-login' onClick={onRegister}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}