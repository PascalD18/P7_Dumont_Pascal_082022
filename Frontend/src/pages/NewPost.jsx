import { useState } from 'react'
import axios from 'axios'
import Dayjs from 'dayjs'
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom'
import Banner from '../components/Banner'
import '../styles/NewPost.css'




//Création d'un poste
function NewPost() {

  // État de navigation transmit au module 'Banner', pour le paramétrage de la mise en forme de ses liens
  sessionStorage.setItem('stateNav', "Nouveau post")

  const baseUrlBack = sessionStorage.getItem("baseUrlBack");
  const baseUrl = `${baseUrlBack}posts/`
  const userId = localStorage.getItem("userId")
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState()
  const dateAct = Dayjs().format("YYYY-MM-DD")
  const navigate = useNavigate()

  // État de navigation transmit au module 'Banner', pour le paramétrage de la mise en forme de ses liens
  sessionStorage.setItem('stateNav', "Nouveau post")
  const handleSubmit = e => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    const headers = {
      "Authorization": `Bearer ${token}`,
      'My-Custom-Header': 'foobar'
    }

    const postJson = {
      userId: userId,
      dateCreate: dateAct,
      lastName: lastName,
      firstName: firstName,
      description: description
    }

    const postLinea = JSON.stringify(postJson)

    const postData = new FormData()
    postData.append("post", postLinea)
    postData.append('image', image)

    axios.post(baseUrl, postData, { headers })

      .then((res) => {
        sessionStorage.setItem('messServeur', res.data.message)
        alert("post enregistré")
        sessionStorage.setItem('StatePosts',"non vide")
        sessionStorage.setItem('stateNav', "Liste des posts")
        navigate('/AllPosts')

      })
      .catch((err) => { console.log(err) })
  }
  return (
    <div>
      <div><Banner /></div>
      <div>
        <p>Créé le:<span>{dateAct}</span></p>

        <label htmlFor="Nom" ></label>
        <input
          type="string"
          name="Nom"
          placeholder="Nom"
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
        <label htmlFor="Prénom" ></label>
        <input
          type="string"
          placeholder="Prénom"
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />
        <label htmlFor="Description" ></label>
          <textarea className="description"
          value={description}
          onChange={event => setDescription(event.target.value)}/>
        <div>
          <input type="file" id="image"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={e => setImage(e.target.files[0])}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>

      </div>
    </div>
  )
};
export default NewPost