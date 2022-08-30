import React, { useState } from 'react'
//import './Login.scss'
//import { Link } from "react-router-dom";
import axios from 'axios'

const baseUrl = "http://localhost:3001/api/auth/login"


function Login() {

//const navigate = useNavigate()
const [Email , setEmail] = useState('')
const [Password , setPassword] = useState('')

const log = (e) => {
  //mettre ses conditions if ici 
  e.preventDefault()
  const obj = {
    email : Email,
    password : Password,
  }
  axios.post(baseUrl,obj)
  .then( (response) => {  
    localStorage.setItem('token', JSON.stringify(response.data.token))
  //  navigate('/Wall') 
 })
 .catch((err) => { console.log(err)})
}

  return (
      <div className='containerLogin loginpage'>

      <div className='cardLogin'>
        <img src="images/icon-left-font-monochrome-black.png" alt="Groupomania Logo" className='logoLogin'/>
        <form onSubmit={log}>
          <p>Email :</p>
          <input type="email" name ="email" id ="email"onChange={ e =>{ setEmail(e.target.value)}} required/>
          <p>Mot de passe :</p>
          <input type="password" name="password" id="password" onChange={ e =>{ setPassword(e.target.value)}} required/>
          <br />
          <button className='submit'type ='submit'  value ="Submit">Connection</button>
        </form>
        </div>
        <div>
         <p>{/*Pas encore de compte ?<Link to="/Signup">Créer un compte</Link>*/}</p>
        </div>
      </div>
  )
}

export default Login

