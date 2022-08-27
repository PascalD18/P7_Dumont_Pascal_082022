import React, { useState } from 'react'
//import Postes from '../pages/Postes'
//import Banner from './Banner';

//Création d'un poste
function NewPoste () {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault()

    // Requête axiox.post(baseUrl/api/postes)

    //window.location = "http://localhost:3000/Postes"
  }

  return (
    <div>
     
        <label htmlFor="firstName" ></label>
          <input
            type="string"
            name="firsName"
            placeholder="Prénom"
            value={ firstName }
            onChange={ event => setFirstName(event.target.value) }
          />
        <label htmlFor="lastName" ></label>
          <input
            type="string"
            name="firsName"
            placeholder="Prénom"
            value={ lastName }
            onChange={ event => setLastName(event.target.value) }
          />
          <button onClick={handleSubmit}>Submit</button>

    </div>
  )
};
export default NewPoste