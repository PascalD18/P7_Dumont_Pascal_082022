import { useNavigate } from 'react-router-dom'
import Dayjs from 'dayjs'
import './AllPosts.css'
import '../../styles/index.css'

function NavAllPosts() {
  const navigate = useNavigate()

  const onClickHandler = (e) => {
    const nav = `${e.target.dataset.nav}`
    if (nav === `/`) { navigate(nav) }
    sessionStorage.setItem('typeForm', "NewPost")
    const dateAct = Dayjs().format('YYYY-MM-DD')
    const post = {
      dateCreate: dateAct,
      description: "",
      imageUrl: "/avatar.jpg"
    }
    sessionStorage.setItem('Post', JSON.stringify(post))
    navigate(nav)
  }
  return (
    <div className="ANav_Sect">
      <button className="Btn_Listening"
        data-nav="/FormNewUpDate"
        onClick={onClickHandler}>
        NOUVEAU POST
      </button>
      <p className="SubTitle">LISTE DE TOUS LES POSTS</p>
      <button className="Btn_Listening"
        data-nav="/"
        onClick={onClickHandler}
      >
        DÉCONNEXION
      </button>
    </div>
  )
}
export default NavAllPosts