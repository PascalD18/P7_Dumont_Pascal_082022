//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/img/global/icon-logo_groupomania.png'
import '../../styles/index.css'
import './UpDatePost.css'


function BannerUpDate() {
  const navigate = useNavigate()

  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }

  return (
    <div className="B_Sect">
        <img className="Logo" src={Logo} alt='Groupomania' />
      <h1 className="B_title">Boite à idées</h1>
      <div className="B_GrpBtn">
          <div className="B_GrpBtn_ContLeft">
            <button className="Btn_Listening"
            data-nav="/AllPosts"
            onClick={onClickHandler}
          >
            LISTE DES POSTES
          </button>
          <button className="Btn_Selected"
            onClick={onClickHandler}
          >
            MODIFICATION DE POST
          </button>
        </div>
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
export default BannerUpDate