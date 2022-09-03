import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Banner from '../components/Banner'

function ConnectLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // État de navigation transmit au module 'Banner', pour le paramétrage de la mise en forme de ses liens
  sessionStorage.setItem('stateNav',"Connexion")

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
      //       axios.post(baseUrl,obj)

      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.userId)
        if (res.request.status === 200) {
          alert("Utilisateur logé")
        }

        navigate('/AllPosts')
      })
      .catch((err) => {
        //console.log(err) 
        alert(err)

      })

  }
  return (
    <div>
      <div><Banner /></div>
      <div>
        <label htmlFor="saisieEmail" >Email</label>
        <input className="login"
          type="email"
          name="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={event => { setEmail(event.target.value) }} />
        <label htmlFor="saisiePassword">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button onClick={handleSubmit}>Valider</button>

      </div>
    </div>
  )
}
export default ConnectLogin