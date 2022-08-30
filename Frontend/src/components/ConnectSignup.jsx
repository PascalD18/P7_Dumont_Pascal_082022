import React, { useState } from 'react'
//import { useParams } from 'react-router-dom'
import axios from 'axios'
//import { useHistory } from 'react-router-dom'
//import {Redirect} from 'react-router'
//import {browserHistory} from 'react-router'
//import Postes from '../pages/Postes'
//import Banner from './Banner';


function ConnectForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault()

    // Initialisation de l'entête de la requête
    const headers = {
      "Accept": `application/json`,
      "Accept-Language": `fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3`,
      "Content-type": `application/json; charset=utf-8`
    }
    const baseUrlBack = sessionStorage.getItem("baseUrlBack");
    const baseUrl = `${baseUrlBack}/auth/signup`
    
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
      })
      .catch((err) => { console.log(err) })
  }
  return (
    <div>

        <p>INSCRIPTION</p>

      <label htmlFor="exampleEmail" >Email</label>
      <input className="login"
        type="email"
        name="email"
        id="exampleEmail"
        placeholder="email"
        value={email}
        onChange={event => { setEmail(event.target.value) }} />
      <label htmlFor="examplePassword">Password</label>
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
export default ConnectForm