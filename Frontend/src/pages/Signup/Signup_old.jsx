import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BannerSignup from './BannerSignup'
import '../../styles/Form.css'

function Signup_old() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // État de navigation transmit au module 'Banner', pour le paramétrage de la mise en forme de ses liens
  sessionStorage.setItem('stateNav',"Inscription")
  const handleSubmit = (e) => {
    e.preventDefault()

    // Initialisation de l'entête de la requête
    const headers = {
      "Accept": `application/json`,
      "Accept-Language": `fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3`,
      "Content-type": `application/json; charset=utf-8`
    }
    const baseUrlBack = sessionStorage.getItem("baseUrlBack");
    const baseUrl = `${baseUrlBack}auth/signup`
    
    const obj = {
      email: email,
      password: password
    }

    axios({
      method: 'post',
      headers: headers,
      url: baseUrl,
      data: obj
    })
      .then((res) => {

        sessionStorage.setItem('messServeur', res.data.message)
        navigate('/AllPosts')
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <div>
      <div>
        <BannerSignup/>   
      </div>
      <label htmlFor="exampleEmail" >Email</label>
      <input className="identifiant"
        type="email"
        name="email"
        id="exampleEmail"
        placeholder="email"
        value={email}
        onChange={event => { setEmail(event.target.value) }} />
      <label htmlFor="Mot de passe">Password</label>
      <input
        type="password"
        name="password"
        id="examplePassword"
        placeholder="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

    </div>
  )
}
export default Signup_old