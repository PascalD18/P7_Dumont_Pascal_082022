import { useState } from 'react'
import axios from 'axios'
import Dayjs from 'dayjs'
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom'
import BannerNewPost from './BannerNewPost'
import '../../styles/index.css'
import './NewPost.css'

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
  const [StateBtnSubmit,setStateBtnSubmit] = useState(true)
  const navigate = useNavigate()
   
  const UpDateStatusBtn = e => {
    e.preventDefault()
    setImage(e.target.files[0])
    
    document.getElementById("BtnSubmit").className = "Btn_Listening"
    setStateBtnSubmit(false)

  }
  const handleSubmit = e => {
    e.preventDefault()

    const headers = JSON.parse(localStorage.getItem('authHeader'))
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
        //  sessionStorage.setItem('messServeur', res.data.message)
        alert("post enregistré")
        navigate('/AllPosts')
      })
      .catch((err) => { console.log(err) })
    //}

  }

  return (
    <div>
      <div><BannerNewPost /></div>
      <form>
        <div className="N_Sect">
          <div className="N_GrpEmis">
            <div className="N_GrpEmis_ContDatas">
              <div className="N_GrpEmis_ContDatas_ContInput">
                <label className="Label_Data" htmlFor="Date">Date d'émission</label>
                <p ><span className="Text_Data">{dateAct}</span></p>
              </div>
              <div className="N_GrpEmis_ContDatas_ContInput">
                <label className="Label_Data" htmlFor="Nom" >Nom</label>
                <input className="Text_Input"
                  type="text"
                  placeholder="Nom"
                  nom="lastName"
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                />
              </div>
              <div className="N_GrpEmis_ContDatas_ContInput">
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
          <div className="N_GrpDescr">
            <label className="Label_Data" htmlFor="Description" >Description</label>
            <textarea className="Form_Textarea"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
          <div className="N_GrpImg">
            <div className="N_GrpImg_ContImg">
              <>
                {image === undefined &&
                  <img src="/avatar.jpg" alt="avatar"></img>
                }</>
            </div>
            <div className="N_GrpImg_ContBtn">
              <input className="Btn_Img" type="file" id="image"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={UpDateStatusBtn}
              />
              <button id="BtnSubmit" disabled={StateBtnSubmit} onClick={handleSubmit}>
                VALIDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default NewPost