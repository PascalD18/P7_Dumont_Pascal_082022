import { useNavigate } from 'react-router-dom'
//import { useGlobalState } from '../../components/StateGlobal'
import '../../styles/index.css'

function BannerUpDate() {
  const navigate = useNavigate()
  const typeForm = localStorage.getItem('typeForm')
  const HandleAllPosts = (e) => {
    navigate('/AllPosts')
  }
  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }
  return (
    <div>
      {typeForm === "UpDate" ? (
        <div className="FNav_Sect">
          <button className="Btn_Listening"
            onClick={HandleAllPosts}
          >
            LISTE DES POSTS
          </button>
          <p className="SubTile">MODIFICATION D'UN POST</p>
          <button className="Btn_Listening"
            data-nav="/"
            onClick={onClickHandler}
          >
            DÉCONNEXION
          </button>
        </div>
      ) : (
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
      )}
    </div>
  )
}
export default BannerUpDate