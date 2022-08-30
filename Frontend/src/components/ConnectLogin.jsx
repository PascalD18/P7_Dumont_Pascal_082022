import React, { useState } from 'react'
//import {useNavigate} from 'react-router-dom'
//import { useParams } from 'react-router-dom'
import axios from 'axios'

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
    const baseUrl = `${baseUrlBack}/auth/login`

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
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', JSON.stringify(res.data.userId))
        if (res.request.status === 200) {
          alert("Utilisateur logé")
        }
        window.location.replace('http://localhost:3000/Postes')
      })
      .catch((err) => {
        //console.log(err) 
        alert(err.response.data.error)

      })

  }
  return (
    <div>
      <p>CONNEXION</p>
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