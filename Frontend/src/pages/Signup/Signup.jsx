import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BannerSignup from './BannerSignup'
import '../../styles/Form.css'

function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()

    // Récupération des variables globales
    const baseHeader = JSON.parse(sessionStorage.getItem('baseHeader'))
    const baseUrlBack = sessionStorage.getItem("baseUrlBack");

    //Initialisation de l'url de base
    const baseUrlSignup = `${baseUrlBack}auth/signup`

    // Maj des données avant envoi de la requête
    const obj = {
      email: email,
      password: password
    }
    axios({
      method: 'post',
      headers: baseHeader,
      url: baseUrlSignup,
      data: obj
    })
      .then((res) => {
        alert(res.data.message)
        // Nouvelle requête en mode connexion login
        const baseUrlLogin = `${baseUrlBack}auth/login`
        axios({
          method: 'post',
          url: baseUrlLogin,
          data: obj
        })
          .then((res) => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)

            // MAJ du header en y ajoutant l'autorisation au header de base avec la méthode 'Bearer'
            const baseHeader = JSON.parse(sessionStorage.getItem('baseHeader'))
            baseHeader.Authorization= `Bearer ${res.data.token}`
            localStorage.setItem('authHeader', JSON.stringify(baseHeader))
            localStorage.setItem('authNav', 'Nav Ok')

            // Affichage de tous les postes
            navigate('/AllPosts')
          })
          .catch((err) => { alert(err) });

      })
      .catch((err) => { alert(err) })



  }

  return (
    <div>
      <div>
        <BannerSignup />
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
export default Signup