import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
//import Postes from '../pages/Postes'
//import Banner from './Banner';




//Création d'un poste
function NewPoste() {

  const baseUrlBack = sessionStorage.getItem("baseUrlBack");
  const baseUrl = `${baseUrlBack}/postes/`
  const userId = localStorage.getItem("userId")
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const headers = {
      "Accept": `application/json`,
      "Accept-Language": `fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3`,
      "Authorization": `Bearer ${token}`,
      "Content-Type": `application/json; charset=utf-8`
    }
    const obj = {
      userId: userId,
      name: name,
      description: description
    }
    axios({
      method: 'post',
      headers: headers,
      url: baseUrl,
      data: obj
    })
  }
  return (
    <div>
      <nav>
        <Link to="/Postes">Tous les postes</Link>
      </nav>
      <p>CREATION D'UN POSTE</p>
      <label htmlFor="firstName" ></label>
      <input
        type="string"
        name="Nom"
        placeholder="Nom"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <label htmlFor="lastName" ></label>
      <input
        type="string"
        name="Description"
        placeholder="Description"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

    </div>
  )
};
export default NewPoste