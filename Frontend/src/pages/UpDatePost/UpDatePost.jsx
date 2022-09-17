import { useEffect, useState } from 'react'
import axios from 'axios'
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom'
import BannerUpDate from './BannerUpDate'
import '../../styles/index.css'
import './UpDatePost.css'

//Modification d'un post
function UpDatePost() {
  const navigate = useNavigate()
  const post = JSON.parse(sessionStorage.getItem('Post'))
  const usersList = JSON.parse(sessionStorage.getItem('usersList'))
  const baseUrlBack = sessionStorage.getItem("baseUrlBack");
  const baseUrl = `${baseUrlBack}posts/${post._id}`
  const [description, setDescription] = useState('');
  const [image, setImage] = useState()
  const [imageDisplay,setImageDisplay] = useState()


  useEffect(() => {

    setDescription(post.description)

  }, [post.description]);

  //const [dataSend, setDataSend] = useState([])
  const handleSubmit = e => {
    e.preventDefault()
  //  const token = sessionStorage.getItem('token')
  //  const headers = {
  //    "Authorization": `Bearer ${token}`,
  //   'My-Custom-Header': 'foobar'
  //  }
    const headers = JSON.parse(sessionStorage.getItem('authHeader'))
    const postJson = {
      userId:post.userId,
      description: description
    }
    // Requête pour mis à jour de la base de donnée MongoDB
    if (image === undefined) {

      // Sans l'image
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

      //Avec l'image
      const postLinea = JSON.stringify(postJson)
      const postData = new FormData()
      postData.append("post", postLinea)
      postData.append('image', image)
      axios.put(baseUrl, postData, { headers })
        .then((res) => {
          alert("post modifié")
          sessionStorage.setItem('StatePosts', "non vide")
          navigate('/AllPosts')
        })
        .catch((err) => { alert(err) })
    }
  }

  const onImageChangeURL = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setImageDisplay(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
    }
  }

  return (
    <div>
      <div><BannerUpDate /></div>
      <form>
        <div className="U_Sect">
          <div className="U_GrpImg">
            <div className="U_GrpImg_ContImg">
              <input type="file" onChange={onImageChangeURL} className="img_Post"
                accept=".jpg,.jpeg,.png,.gif"
              />
              {imageDisplay === undefined ? (
                <img src={post.imageUrl} className="img_Post" id="image" alt="ilustration"></img>
              ) : (
                <img src={`${imageDisplay}`}  className="img_Post" id="image" alt="ilustration"></img>
              )
              }

            </div>
            <div className="U_GrpImg_ContBtn">
              <button className="Btn_Listening" onClick={handleSubmit}>
                VALIDER
              </button>
            </div>
          </div>
          <div className="U_GrpEmis">
            <div className="U_GrpEmis_ContDatas">
              <div className="U_GrpEmis_ContDatas_ContContained">
                <label className="Label_Data" htmlFor="Date">Date d'émission</label>
                <p ><span className="Text_Data">{post.dateCreate}</span></p>
              </div>
              <div className="U_GrpEmis_ContDatas_ContContained">
                <div className="GrpEmis_ContDatas">
                  <label className="Label_Data" htmlFor="Email">Email Utilisateur</label>
                  <p ><span className="Text_Data">
                    {usersList.find(el => el._id === post.userId).email}
                  </span></p>
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
          </div>
        </div>
      </form>
    </div>
  )
};
export default UpDatePost