import React, { useState } from 'react'
//import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
//import { useHistory } from 'react-router-dom'
//import {Redirect} from 'react-router'
//import {browserHistory} from 'react-router'
//import Postes from '../pages/Postes'
//import Banner from './Banner';


function ConnectForm() {
  const { connectType } = useParams()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const headers = {
  //  "accept": `application/json`,
  //  "Accept-Language": `fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3`,
  //  "content-type": `application/json; charset=utf-8`,
  //  "Authorization" : "Bearer"
  // }
  const baseUrlBack = sessionStorage.getItem("baseUrlBack");


  const handleSubmit = (e) => {

    e.preventDefault()

    const baseUrl = `${baseUrlBack}/auth/${connectType}`
    const obj = {
      email: email,
      password: password
    }

    console.log(connectType)
    connectType === 'login' ? (

      // Requête login utilisateur
      axios.post(`${baseUrlBack}/auth/${connectType}`,obj)
        .then((res) => {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', JSON.stringify(res.data.userId))
          if (res.request.status === 200){
            alert("Utilisateur logé")
          }
          window.location.replace('http://localhost:3000/Postes')
        })
        .catch((err) => {
          //console.log(err) 
          alert (err.response.data.error)

        })
    ) : (
      // Requête Signup utilisateur
      axios.post(baseUrl, obj)
        .then((res) => {
          //          localStorage.setItem('token', JSON.stringify(res.data.token))
          sessionStorage.setItem('messServeur', res.data.message)

        })
        .catch((err) => { console.log(err) })
    )

    // Retour à la page d'affichage de tous les postes

  }
  return (
    <div>
      {connectType === 'login' ? (
        <p>CONNEXION</p>
      ) : (
        <p>INSCRIPTION</p>
      )}
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