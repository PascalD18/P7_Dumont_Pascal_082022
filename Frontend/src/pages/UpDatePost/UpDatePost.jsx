import { useEffect, useState } from 'react'
import axios from 'axios'
import Dayjs from 'dayjs'
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom'
import BannerUpDate from './BannerUpDate'
import '../../styles/index.css'
import './UpDatePost.css'

//Création d'un poste
function UpdatePost() {
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")
  //const postId = sessionStorage.getItem('PostId')
  const post = JSON.parse(sessionStorage.getItem('Post'))
  const baseUrlBack = sessionStorage.getItem("baseUrlBack");
  const baseUrl = `${baseUrlBack}posts/${post._id}`
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState()
  const dateAct = Dayjs().format("YYYY-MM-DD")



  useEffect(() => {
    setFirstName(post.firstName)
    setLastName(post.lastName)
    setDescription(post.description)

  }, [post.firstName, post.lastName, post.description]);

  //const [dataSend, setDataSend] = useState([])
  const handleSubmit = e => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const headers = {
      "Authorization": `Bearer ${token}`,
      'My-Custom-Header': 'foobar'
    }
    //const headers = JSON.parse(localStorage.getItem('authHeader'))
    const postJson = {
      userId: userId,
      dateCreate: dateAct,
      lastName: lastName,
      firstName: firstName,
      description: description,

    }

    // Requête pour mis à jour de la base de donnée MongoDB
    if (image === undefined) {
      axios.put(baseUrl, postJson, { headers })
        .then((res) => {
          sessionStorage.setItem('messServeur', res.data.message)
          alert("post modifié")
          sessionStorage.setItem('Post', JSON.stringify(postJson))
          sessionStorage.setItem('StatePosts', "non vide")
          navigate('/AllPosts')
        })
        .catch((err) => { alert(err) })
    } else {
      const postLinea = JSON.stringify(postJson)
      const postData = new FormData()
      postData.append("post", postLinea)
      postData.append('image', image)
      axios.put(baseUrl, postData, { headers })
        .then((res) => {
          sessionStorage.setItem('messServeur', res.data.message)
          alert("post modifié")
          sessionStorage.setItem('StatePosts', "non vide")
          navigate('/AllPosts')
        })
        .catch((err) => { alert(err) })
    }
  }

  return (
    <div>
      <div><BannerUpDate /></div>
      <form>
        <div className="U_Sect">
          <div className="U_GrpEmis">
            <div className="U_GrpEmis_ContDatas">
              <div className="U_GrpEmis_ContDatas_ContInput">
                <label className="Label_Data" htmlFor="Date">Date d'émission</label>
                <p ><span className="Text_Data">{dateAct}</span></p>
              </div>
              <div className="U_GrpEmis_ContDatas_ContInput">
                <label className="Label_Data" htmlFor="Nom" >Nom</label>
                <input className="Text_Input"
                  type="text"
                  placeholder="Nom"
                  nom="lastName"
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                />
              </div>
              <div className="U_GrpEmis_ContDatas_ContInput">
                <label className="Label_Data" htmlFor="Prénom" >Prénom</label>
                <input className="Text_Input"
                  type="text"
                  placeholder="Prénom"
                  id="Nom"
                  value={firstName}
                  onChange={event => setFirstName(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="U_GrpDescr">
            <label className="Label_Data" htmlFor="Description" >Description</label>
            <textarea className="Form_Textarea"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
          <div className="U_GrpImg">
            <div className="U_GrpImg_ContImg">
              <img id="image" className="img_Descr" src={post.imageUrl} alt="avatar2"></img>
            </div>
            <div className="U_GrpImg_ContBtn">
              <input className="Btn_Img" type="file" id="image"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={e => setImage(e.target.files[0])}
              />
              <button className="Btn_Listening" onClick={handleSubmit}>
                VALIDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
};
export default UpdatePost