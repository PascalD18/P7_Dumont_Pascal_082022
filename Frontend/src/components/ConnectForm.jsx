import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
//import { useHistory } from 'react-router-dom'
//import {Redirect} from 'react-router'
//import {browserHistory} from 'react-router'
//import Postes from '../pages/Postes'
//import Banner from './Banner';

const ConnectForm = () => {
  const { connectType } = useParams()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const headers = {
    "accept": `application/json`,
    "Accept-Language": `fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3`,
    "content-type": `application/json; charset=utf-8`
  }
  const baseUrlBack = sessionStorage.getItem("baseUrlBack");
  const body = {
    "email": { email },
    "password": { password }
  }
  const handleSubmit = e => {

    e.preventDefault()
    connectType === 'login' ? (

      // Requête login utilisateur
      axios.post(`${baseUrlBack}/auth/login`,
        { headers },
        { body:JSON.stringify(body) } // { body } également essayé
      )
        .then((res) => {
          //setPostes(res.data)
          const token = res.data.token
          sessionStorage.setItem("token", token)
        })
    ) : (

      console.log(connectType)
    )

    // Retour à la page d'affichage de tous les postes
    window.location.replace('http://localhost:3000/Postes')
  }
  return (
    <div>
      {connectType === 'signup' ? (
        <h1>INSCRIPTION</h1>
      ) : (
        <h1>CONNEXION</h1>
      )}

      <label htmlFor="exampleEmail" >Email</label>
      <input className="login"
        type="email"
        name="email"
        id="exampleEmail"
        placeholder="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
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
export default ConnectForm;