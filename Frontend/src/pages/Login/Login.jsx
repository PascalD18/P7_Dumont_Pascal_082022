import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BannerLogin from './BannerLogin'
import '../../styles/Form.css'

function Login() {
  const navigate = useNavigate()

  localStorage.clear('token')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    const baseUrlBack = sessionStorage.getItem("baseUrlBack");
    const baseUrl = `${baseUrlBack}auth/login`

    const obj = {
      email: email,
      password: password
    }
    axios({
      method: 'post',
      url: baseUrl,
      data: obj
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.userId)
        if (res.request.status === 200) {
          alert("Utilisateur logé")

        }
        navigate('/AllPosts')

      })
      .catch((err) => {
        alert(err)

      })

  }
  return (

    <div>
      <div>
        <BannerLogin />
      </div>
      <div className="login_sec">
        <div className="login_grp_datas">
        <div className="login_grp_data">
          <label htmlFor="saisieEmail" >Email</label>
          <input className="login"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={event => { setEmail(event.target.value) }} />
        </div>
        <div className="login_grp_data">
          <label htmlFor="saisiePassword">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
           </div>
          <button onClick={handleSubmit}>Valider</button>
          </div>
       
      </div>
    </div>

  )
}
export default Login