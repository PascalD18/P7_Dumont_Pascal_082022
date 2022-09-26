import { useEffect, useState } from 'react'
import axios from 'axios'
import Dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Banner from '../../components/Banner'
import NavNewUpDate from './NavNewUpDate'
import { useGlobalState } from '../../components/StateGlobal'
import '../../styles/index.css'
import './FormNewUpDate.css'

function FormPost() {
  const navigate = useNavigate()
  const typeForm = useGlobalState('typeForm')
  const post = JSON.parse(sessionStorage.getItem('Post'))
  const usersList = JSON.parse(sessionStorage.getItem('usersList'))
  const userId = sessionStorage.getItem('userId')
  const [image, setImage] = useState()
  const [imageDisplay, setImageDisplay] = useState()
  const [description, setDescription] = useState('')
  const authHeader = useGlobalState('authHeader')
  const baseUrlBack = useGlobalState('baseUrlBack')


  useEffect(() => {
    document.getElementById("description").innerHTML = post.description
    const elemBtnSubmit = document.getElementById('Btn_Submit')
    if (typeForm[0] === 'NewPost') {
      if (imageDisplay === undefined) {
        elemBtnSubmit.className = "Btn_Disable"
        elemBtnSubmit.disabled = true
      } else {
        elemBtnSubmit.className = "Btn_Listening"
        elemBtnSubmit.disabled = false
      }
    } else {
      elemBtnSubmit.className = "Btn_Listening"
      elemBtnSubmit.disabled = false
    }
  }, ([typeForm, post.description, image, imageDisplay]))

  const onImageChangeURL = (e) => {
    e.preventDefault()
    setDescription(document.getElementById("description").innerHTML)
    if (e.target.files && e.target.files[0]) {

      // Si une nouvelle image est choisie => Remplace l'image sélectionnée
      setImageDisplay(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
      let elem = document.getElementById("Btn_Submit")
      elem.className = "Btn_Listening"
      elem.disabled = false
      sessionStorage.setItem('image', image)
    }
  }

  const onClickValidate = (e) => {
    e.preventDefault()

    if (typeForm[0] === 'NewPost') {

      // Sauvegarde d'un nouveau post
      const dateAct = Dayjs().format("YYYY-MM-DD")
      const postJson = {
        dateCreate: dateAct,
        description: description
      }
      const baseUrl = `${baseUrlBack[0]}posts/`
      const postLinea = JSON.stringify(postJson)
      const postData = new FormData()
      postData.append("post", postLinea)
      postData.append('image', image)
      const headers = authHeader[0]
      axios.post(baseUrl, postData, { headers })
        .then((res) => {
          if (res.request.status === 201) {
            alert("Nouveau post créé");
            navigate('/AllPosts')
          }
        })
        .catch((err) => { console.log(err) })
    } else {

      // Mise à jour après validation en mode MODIFICATION ('TypeForm' = 'UpDate')
      const postJson = {
        userId: post.userId,
        description: document.getElementById("description").defaultValue
      }
      const baseUrl = `${baseUrlBack[0]}posts/${post._id}`
      const headers = authHeader[0]
      if (image === undefined) {

        // Sans l'image
        axios.put(baseUrl, postJson, { headers })
          .then((res) => {
            if (res.request.status === 200) {
              navigate('/AllPosts')
            }
          })
          .catch((err) => { alert(err) })
      } else {

        //Avec l'image
        const postLinea = JSON.stringify(postJson)
        const postData = new FormData()
        postData.append("post", postLinea)
        postData.append('image', image)
        axios.put(baseUrl, postData, { headers })
          .then((res) => {
            if (res.request.status === 200) {
              navigate('/AllPosts')
            }
          })
          .catch((err) => { alert(err) })
      }
    }
  }
  return (
    <div>
      <div><Banner /></div>
      <div><NavNewUpDate /></div>
      <form>
        <div className="UN_Sect">
          <div className="UN_GrpImg">
            <div className="UN_GrpImg_ContImg">
              <input type="file" onChange={onImageChangeURL}
                accept=".jpg,.jpeg,.png,.gif"
              />
              {imageDisplay === undefined ? (
                <img className="img_Post" src={post.imageUrl} id="image" alt="illustration"></img>
              ) : (
                <img className="img_Post" src={`${imageDisplay}`} id="image" alt="illustration"></img>
              )}
            </div>
            <div className="UN_GrpImg_ContBtn">
              <button id="Btn_Submit" onClick={onClickValidate}>VALIDER</button>
            </div>
          </div>
          <div className="UN_GrpEmis">
            <div className="UN_GrpEmis_ContDatas">
              <div className="UN_GrpEmis_ContDatas_Data">
                <label className="UN_Label_Data Label_Data" htmlFor="Date">Date d'émission</label>
                <p ><span className="UN_Text_Data Text_Data">{post.dateCreate}</span></p>
              </div>
              <div className="UN_GrpEmis_ContDatas_Data">
                <label className="UN_Label_Data Label_Data" htmlFor="Email">Email Utilisateur</label>
                {typeForm[0] === "NewPost" ? (
                  <p ><span className="UN_Text_Data Text_Data"> {usersList.find(el => el._id === userId).email}</span></p>
                ) : (
                  <p ><span className="UN_Text_Data Text_Data"> {usersList.find(el => el._id === post.userId).email}</span></p>
                )}
              </div>
            </div>
            <div className="UN_GrpDescr">
              <label className="Label_Data" htmlFor="Description" >Description</label>
              <textarea className="UN_Textarea Textarea" id="description"
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default FormPost