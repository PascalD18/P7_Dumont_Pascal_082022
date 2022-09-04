import React from 'react'
import Select from 'react-select'
import '../styles/Test.css'
//import OnSelect from "../components/OnSelect"




const MyComponent = () => {

  //const options = [
 // { value: 'chocolate', label: 'Chocolate 1',test:'Essai' },
//  { value: 'strawberry', label: 'Strawberry' }
  //{ value: 'vanilla', label: 'Vanilla' }
//]

const post = [JSON.parse(sessionStorage.getItem('Post'))]

const Traite = e => {
  alert(e.lastName)
}


  return (

          <div className="container">          
           <Select 
           placeholder="Sélectionner une date"
           onChange={Traite}
            options={post}/>
          </div>

  )





}

export default MyComponent

