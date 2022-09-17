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
  const userId = sessionStorage.getItem('userId')
  const usersList= JSON.parse(sessionStorage.getItem("usersList"))
  const [description, setDescription] = useState('')
  const [image, setImage] = useState()
  const [imageDisplay,setImageDisplay] = useState()
  const dateAct = Dayjs().format("YYYY-MM-DD")
  const [disableBtnSubmit, setDisableBtnSubmit] = useState(true)
  const navigate = useNavigate()

  const onImageChangeURL = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageDisplay(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
      setDisableBtnSubmit(false)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setDisableBtnSubmit(false)
    //Création du post
    const headers = JSON.parse(sessionStorage.getItem('authHeader'))
    const postJson = {
      dateCreate: dateAct,
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
                <p ><span className="Text_Data">
                {usersList.find(el => el._id === userId).email}
                </span></p>
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
              <input type="file" onChange={onImageChangeURL} className="img_Post"
                accept=".jpg,.jpeg,.png,.gif"
              />
              {imageDisplay === undefined ? (
                <img src="/avatar.jpg" className="img_Post" alt="ilustration"></img>
              ) : (
                <img src={`${imageDisplay}`} className="img_Post" alt="ilustration"></img>
              )
              }
            </div>
            <div className="N_GrpImg_ContBtn">
              <button id="BtnSubmit" disabled={disableBtnSubmit} onClick={handleSubmit}>
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