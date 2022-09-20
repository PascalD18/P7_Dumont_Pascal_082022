import { useNavigate } from 'react-router-dom'
import OnSelect from "../../components/OnSelect"
import '../../styles/index.css'

function BannerUpDate() {
  const navigate = useNavigate()

  const HandleAllPosts = (e) => {
    navigate('/AllPosts')
  }
  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }
  return (
    <div className="FNav_Sect">
      <OnSelect handleClick={HandleAllPosts}>
        <button className="Btn_Listening" >
          LISTE DES POSTS
        </button>
      </OnSelect>
      <p className="SubTile">MODIFICATION D'UN POST</p>
      <button className="Btn_Listening"
        data-nav="/"
        onClick={onClickHandler}
      >
        DÉCONNEXION
      </button>
    </div>
  )
}
export default BannerUpDate