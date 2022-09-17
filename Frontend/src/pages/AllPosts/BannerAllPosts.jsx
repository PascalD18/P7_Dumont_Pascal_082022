//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/img/global/icon-logo_groupomania.png'
import '../../styles/index.css'

function BannerAllPosts() {
  const navigate = useNavigate()

  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }

  return (
    <div className="B_Sect">
      <img src={Logo} alt='Groupomania' className="Logo" />
      <h1 className="Title">Boite à idées</h1>
      <div className="B_GrpBtn">
      <div className="B_GrpBtn_ContLeft">
          <button className="Btn_Listening"
            data-nav="/NewPost"
            onClick={onClickHandler}
          >
            NOUVEAU POSTE
          </button>
        </div>
        <h2>LISTE DE TOUS LES POSTES</h2>
        <button className="Btn_Listening"
          data-nav="/"
          onClick={onClickHandler}
        >
          DÉCONNEXION
        </button>
      </div>
    </div>
  )
}
export default BannerAllPosts