import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Banner from '../../components/Banner'
import NavSignup from './NavSignup'
import '../../styles/index.css'
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

            sessionStorage.setItem('userId', res.data.userId)

            // Mémorise le type d'utilisateur
            // ( si typeUser = 'Admin' => accès Modif et suppression de tous les posts)
            sessionStorage.setItem('typeUser', res.data.typeUser)

            // MAJ du header en y ajoutant l'autorisation au header de base avec la méthode 'Bearer'
            const baseHeader = JSON.parse(sessionStorage.getItem('baseHeader'))
            baseHeader.Authorization = `Bearer ${res.data.token}`
            sessionStorage.setItem('authHeader', JSON.stringify(baseHeader))
            sessionStorage.setItem('authNav', 'Nav Ok')

            //Requête et mémorisation de tous les utilisateurs
            const headers = JSON.parse(sessionStorage.getItem('authHeader'))
            const baseUrlUsers = `${baseUrlBack}auth/`
            axios.get(baseUrlUsers, { headers })
              .then((res) => {
                sessionStorage.setItem('usersList', JSON.stringify(res.data))
              })
              .catch((err) => { console.log(err) })

            // Affichage de tous les postes
            navigate('/AllPosts')
          })
          .catch((err) => { alert(err) });

      })
      .catch((err) => { alert(err) })
  }

  return (
    <div>
      <div><Banner /></div>
      <div><NavSignup /></div>
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