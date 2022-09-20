import { useEffect, useState } from 'react'
import axios from 'axios'
import Dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Banner from '../../components/Banner'
import NavNew from './NavNew'
import NavUpDate from './NavUpDate'
import '../../styles/index.css'
import './FormNewUpDate.css'

function FormPost() {
  const navigate = useNavigate()
  const typeForm = sessionStorage.getItem('typeForm')
  const post = JSON.parse(sessionStorage.getItem('Post'))
  const usersList = JSON.parse(sessionStorage.getItem('usersList'))
  const userId = sessionStorage.getItem('userId')
  const [image, setImage] = useState()
  const [imageDisplay, setImageDisplay] = useState()
  const [description, setDescription] = useState('');
  const headers = JSON.parse(sessionStorage.getItem('authHeader'))
  const baseUrlBack = sessionStorage.getItem("baseUrlBack");

  useEffect(() => {
    const elemBtnSubmit = document.getElementById('Btn_Submit')
    if (typeForm === 'NewPost') {
      elemBtnSubmit.className = "Btn_Disable"
      elemBtnSubmit.disabled = true
    } else {
      elemBtnSubmit.className = "Btn_Listening"
      elemBtnSubmit.disabled = false
    }
    setDescription(post.description)
  }, ([typeForm, post.description]))

  const onImageChangeURL = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setImageDisplay(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
      let elem = document.getElementById("Btn_Submit")
      elem.className = "Btn_Listening"
      elem.disabled = false
      sessionStorage.setItem('image', image)
    }
  }

  const onClickValidate = (e) => {
    if (typeForm === 'NewPost') {

      // Sauvegarde d'un nouveau post
      const dateAct = Dayjs().format("YYYY-MM-DD")
      const postJson = {
        dateCreate: dateAct,
        description: description
      }
      const baseUrl = `${baseUrlBack}posts/`
      const postLinea = JSON.stringify(postJson)
      const postData = new FormData()
      postData.append("post", postLinea)
      postData.append('image', image)
      axios.post(baseUrl, postData, { headers })
        .then((res) => {
          sessionStorage.setItem('Post', JSON.stringify(post))

        })
        .catch((err) => { console.log(err) })
      alert("nouveau post créé")
      navigate('/AllPosts')
    } else {

      // Mise à jour d'un post modifié
      const postJson = {
        userId: post.userId,
        description: description
      }
      const baseUrl = `${baseUrlBack}posts/${post._id}`
      if (image === undefined) {
        // Sans l'image
        axios.put(baseUrl, postJson, { headers })
          .then((res) => {
            sessionStorage.setItem('Post', JSON.stringify(post))
          })
          .catch((err) => { alert(err) })
        alert("post modifié")
        navigate('/AllPosts')
      } else {

        //Avec l'image
        const postLinea = JSON.stringify(postJson)
        const postData = new FormData()
        postData.append("post", postLinea)
        postData.append('image', image)
        axios.put(baseUrl, postData, { headers })
          .then((res) => {
            sessionStorage.setItem('Post', JSON.stringify(post))
          })
          .catch((err) => { alert(err) })
        alert("post modifié")
        navigate('/AllPosts')
      }
    }
  }
  return (
    <div>
      <div><Banner /></div>
      {typeForm === "NewPost" ? (
        <div><NavNew /></div>
      ) : (
        <div><NavUpDate /></div>
      )}
      <form>
        <div className="F_Sect">
          <div className="F_GrpImg">
            <div className="F_GrpImg_ContImg">
              <input type="file" onChange={onImageChangeURL}
                accept=".jpg,.jpeg,.png,.gif"
              />
              {imageDisplay === undefined ? (
                <img className="img_Post" src={post.imageUrl} id="image" alt="illustration"></img>
              ) : (
                <img className="img_Post" src={`${imageDisplay}`} id="image" alt="illustration"></img>
              )}
            </div>
            <div className="F_GrpImg_ContBtn">
              <button id="Btn_Submit" onClick={onClickValidate}>VALIDER</button>
            </div>
          </div>
          <div className="F_GrpEmis">
            <div className="F_GrpEmis_ContDatas">
              <div className="F_GrpEmis_ContDatas_Data">
                <label className="F_Label_Data Label_Data" htmlFor="Date">Date d'émission</label>
                <p ><span className="F_Text_Data Text_Data">{post.dateCreate}</span></p>
              </div>
              <div className="F_GrpEmis_ContDatas_Data">
                <label className="F_Label_Data Label_Data" htmlFor="Email">Email Utilisateur</label>
                {typeForm === "NewPost" ? (
                  <p ><span className="F_Text_Data Text_Data"> {usersList.find(el => el._id === userId).email}</span></p>
                ) : (
                  <p ><span className="F_Text_Data Text_Data"> {usersList.find(el => el._id === post.userId).email}</span></p>
                )}
              </div>
            </div>
            <div className="F_GrpDescr">
              <label className="Label_Data" htmlFor="Description" >Description</label>
              <textarea className="F_Textarea Textarea"
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