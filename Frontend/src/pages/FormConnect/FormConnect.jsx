import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setGlobalState, useGlobalState } from '../../components/StateGlobal'
import axios from 'axios'
import Banner from '../../components/Banner'
import '../../styles/index.css'
import './FormConnect.css'

const FormConnect = () => {
  const navigate = useNavigate()
  const typeConnect = useGlobalState("typeConnect")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const baseUrlBack = useGlobalState("baseUrlBack")
  const baseHeader = useGlobalState('baseHeader')
  sessionStorage.setItem('authNav','Unauthorized')

  const onClickValidate = (e) => {
    e.preventDefault()
    if (typeConnect[0] === "Login") {

      // **** CONNEXION ***

      const baseUrlLogin = `${baseUrlBack[0]}auth/login`
      const obj = {
        email: email,
        password: password
      }
      axios({
        method: 'post',
        url: baseUrlLogin,
        data: obj
      })
        .then((res) => {
          sessionStorage.setItem('userId', res.data.userId)
          sessionStorage.setItem('typeUser', res.data.typeUser)
          const authBearer = {
            Authorization: `Bearer ${res.data.token}`
          }
          setGlobalState('authBearer', authBearer)
          baseHeader[0].Authorization = `Bearer ${res.data.token}`
          setGlobalState('authHeader', baseHeader[0])
          if (res.request.status === 200) {
            alert("Utilisateur logé")
          }

          //Requête et mémorisation de tous les utilisateurs         
          const baseUrlUsers = `${baseUrlBack[0]}auth/`
          const headers = baseHeader[0]
          axios.get(baseUrlUsers, { headers })
            .then((res) => {
              sessionStorage.setItem('usersList', JSON.stringify(res.data))
             
              // Affichage de tous les posts
              sessionStorage.setItem('authNav','OK')
              navigate('/AllPosts')
            })
            .catch((err) => { alert(err) })
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert(`Le mot de passe ne corresponds pas à l'utilisateur ou n'est pas valide 
            ( au moins 8  digits avec au minimum: 
              1 chiffre, 1 minuscule, 1 majuscule et 1 caractère spécial )`)
          } else if (err.response.status === 429) {
            alert("Trop de tentatives: merci de patienter 2 mn pour cet utilisateur")
          } else {
            if (err.response.data.message === undefined){
               alert(err.response.data.error)
            }else{
                alert(err.response.data.message)
            }
          
          }
        })

    } else {

      // ***** INSCRIPTION ****

      //Initialisation de l'url de base
      const baseUrlSignup = `${baseUrlBack[0]}auth/signup`

      // Maj des données avant envoi de la requête
      const obj = {
        email: email,
        password: password
      }
     // const headers = baseHeader[0]
      axios({
        method: 'post',
        //headers: headers,
        url: baseUrlSignup,
        data: obj
      })
        .then((res) => {
          alert(res.data.message)

          // Nouvelle requête en mode connexion login
          const baseUrlLogin = `${baseUrlBack[0]}auth/login`
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
              const authBearer = {
                Authorization: `Bearer ${res.data.token}`
              }
              setGlobalState('authBearer', authBearer)
              baseHeader[0].Authorization = `Bearer ${res.data.token}`
              setGlobalState('authHeader', baseHeader[0])
              if (res.request.status === 200) {
                sessionStorage.setItem('authNav','OK')
                alert("Utilisateur créé")
              }

              //Requête et mémorisation de tous les utilisateurs
              const baseUrlUsers = `${baseUrlBack[0]}auth/`
              const headers = baseHeader[0]
              axios.get(baseUrlUsers, { headers })
                .then((res) => {
                  sessionStorage.setItem('usersList', JSON.stringify(res.data))

                  // Affichage de tous les posts
                  navigate('/AllPosts')
                })
                .catch((err) => {
                  if (res.request.status === 401) {
                    console.log('Utilisateur déjà existant')
                  } else {
                    console.log(err)
                  }
                })
                .catch((err) => { console.log(err) })
            })
            .catch((err) => { alert(err) });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert("Utilisateur déjà existant")
          } else if (err.response.status === 400) {
            alert(err.response.data.message)
          } else {
            alert(err)
          }
        })
    }
  }

  const onClickDeconnect = (e) => {
    navigate('/')
  }
  return (
    <div>
      <div><Banner /></div>
      <div className="FC_Sect">
        <div className="FC_GrpNav">
          {typeConnect[0] === "Login" ? (
            <div className="H_ContSubTitle">
              <p className="SubTitle">CONNEXION</p>
            </div>
          ) : (
            <div className="H_ContSubTitle">
              <p className="SubTitle">INSCRIPTION</p>
            </div>
          )
          }
          <button className="Btn_Listening" onClick={onClickDeconnect}>
            DÉCONNEXION
          </button>
        </div>
        <div className="FC_GrpDatas">
          <div className="FC_GrpDatas_ContData">
            <label className="Label_Data" htmlFor="saisieEmail" >Email</label>
            <input className="Text_Input"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={event => { setEmail(event.target.value) }} />
          </div>
          <div className="FC_GrpDatas_ContData">
            <label className="Label_Data" htmlFor="saisiePassword">Mot de passe</label>
            <input className="Text_Input"
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="FC_GrpBtn">
            <button className="Btn_Listening" onClick={onClickValidate}>
              Valider
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FormConnect