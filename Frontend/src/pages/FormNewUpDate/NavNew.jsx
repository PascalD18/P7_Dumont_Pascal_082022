import { useNavigate } from 'react-router-dom'
import '../../styles/index.css'


function HomeButtons() {
  const navigate = useNavigate()

  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }
  return (
    <div className="FNav_Sect">
      <button className="Btn_Listening"
        data-nav="/AllPosts"
        onClick={onClickHandler}
      >
        LISTE DES POSTS
      </button>
      <p className="SubTitle">CRÉATION D'UN NOUVEAU POST</p>
      <button className="Btn_Listening"
        data-nav="/"
        onClick={onClickHandler}
      >
        DÉCONNEXION
      </button>

    </div>
  )
}
export default HomeButtons