//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/global/icon-logo_groupomania.png'
import '../../styles/index.css'
import '../../styles/Banner.css'
import '../../styles/BannerBtn.css'
import '../../styles/Btn.css'

function HomeButtons() {
  const navigate = useNavigate()

  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }

  return (
    <div className="banner_sect">
      <div className="banner_cont_img">
        <img className="img_logo banner_logo" src={logo} alt='Groupomania' />
      </div>
      <h1 className="banner_title">Boite à idées</h1>
      <div className="bBtn_grp_btn">
        <div className="bBtn_grp_btn_cont">
          <button className="btn_listening"
            data-nav="/AllPosts"
            onClick={onClickHandler}

          >
            LISTE DES POSTES
          </button>
          <button className="btn_listening"
            data-nav="/NewPost"
            onClick={onClickHandler}
          >
            NOUVEAU POSTE
          </button>
        </div>
        <button className="btn_listening"
          data-nav="/"
          onClick={onClickHandler}
        >
          DÉCONNEXION
        </button>
      </div>
    </div>
  )
}
export default HomeButtons