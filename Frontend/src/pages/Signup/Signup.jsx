import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BannerSignup from './BannerSignup'
import './Signup.css'

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
      <div><BannerSignup /></div>
        <div className="S_Sect">
          <div className="S_GrpData">
            <label className="Label_Data" htmlFor="saisieEmail" >Email</label>
            <input className="Text_Input"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={event => { setEmail(event.target.value) }} />
          </div>
          <div className="S_GrpData">
            <label className="Label_Data" htmlFor="saisiePassword">Password</label>
            <input className="Text_Input"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="S_GrpBtn">
            <button className="Btn_Listening" onClick={handleSubmit}>Valider</button>
          </div>
        </div>
    </div>
  )
}
export default Signup