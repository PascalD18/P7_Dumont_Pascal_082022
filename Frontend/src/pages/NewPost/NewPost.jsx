import { useEffect, useState } from 'react'
//import { useState } from 'react'
import axios from 'axios'
import Dayjs from 'dayjs'
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom'
import BannerNewPost from './BannerNewPost'
import '../../styles/Btn.css'

//Création d'un poste
function NewPost() {
  const baseUrlBack = sessionStorage.getItem("baseUrlBack");
  const baseUrl = `${baseUrlBack}posts/`
  const userId = localStorage.getItem("userId")
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState()
  const dateAct = Dayjs().format("YYYY-MM-DD")
  const navigate = useNavigate()


  useEffect(() => {
    if (image === undefined) {
      document.getElementById("boutonImage").disabled = true
    } else {
      document.getElementById("boutonImage").disabled = false
    }
  }, [image]);

  const UpDateStatusBtn = e => {
    e.preventDefault()
    setImage(e.target.files[0])
    document.getElementById("boutonImage").disabled = "false"
  }
  const handleSubmit = e => {
    e.preventDefault()
    //  const token = localStorage.getItem('token')
    //  const headers = {
    //    "Authorization": `Bearer ${token}`,
    //    'My-Custom-Header': 'foobar'
    //  }


    const headers = JSON.parse(localStorage.getItem('authHeader'))
    const postJson = {
      userId: userId,
      dateCreate: dateAct,
      lastName: lastName,
      firstName: firstName,
      description: description
      //imageUrl:`${sessionStorage.getItem('repImages')}Logo_default.png`
    }


    // Requête pour mis à jour de la base de donnée MongoDB
    // if (image === undefined) {

    // const fileLinea=`{"name" : "logo_default.png", "lastModified": ${ Date.now()}, "size" : "15793", "type": "image/jpeg"}`
    // const file = JSON.parse(fileLinea)
    //  const File=[file]
    //  setImage(File)
    //  const postLinea = JSON.stringify(postJson)
    //  const postData = new FormData()
    //  postData.append("post", postLinea)
    //  postData.append('image', image)
    //  axios.post(baseUrl, postData, { headers })

    //   const data = JSON.stringify(postJson)
    //   axios.post(baseUrl, data, { headers })
    //     .then((res) => {
    //       sessionStorage.setItem('messServeur', res.data.message)
    //      alert("post enregistré")
    //      sessionStorage.setItem('Post', JSON.stringify(postJson))
    //      sessionStorage.setItem('StatePosts', "non vide")
    //       navigate('/AllPosts')
    //     })
    //     .catch((err) => { alert(err) })
    // } else {

    const postLinea = JSON.stringify(postJson)
    const postData = new FormData()
    postData.append("post", postLinea)
    postData.append('image', image)
    axios.post(baseUrl, postData, { headers })
      .then((res) => {
        sessionStorage.setItem('messServeur', res.data.message)
        alert("post enregistré")
        navigate('/AllPosts')
      })
      .catch((err) => { console.log(err) })
    //}

  }

  return (
    <div>
      <div>
        <BannerNewPost />
      </div>
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
          onChange={event => setDescription(event.target.value)} />
        <div>
          <input type="file" id="image"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={UpDateStatusBtn}
          />
        </div>
        <>
          {image!== undefined &&
            <img src={`${sessionStorage.getItem("repImages")}${image.name}`} alt="avatar2"></img>
          }</>
        <button id="boutonImage"
          onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
export default NewPost

//<img alt="avatar2"></img>