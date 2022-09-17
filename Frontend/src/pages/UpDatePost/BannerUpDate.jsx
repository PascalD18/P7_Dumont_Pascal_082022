//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/img/global/icon-logo_groupomania.png'
import OnSelect from "../../components/OnSelect"
import '../../styles/index.css'
import './UpDatePost.css'


function BannerUpDate() {
  const navigate = useNavigate()

  const HandleAllPosts = (e) => {
    navigate('/AllPosts')
  }
  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }
  return (
    <div className="B_Sect">
      <img className="Logo" src={Logo} alt='Groupomania' />
      <h1 className="B_title">Boite à idées</h1>
      <div className="B_GrpBtn">
        <OnSelect handleClick={HandleAllPosts}>
          <p className="Btn_Listening" >
            LISTE DES POSTES
          </p>
        </OnSelect>
        <h2>MODIFICATION D'UN POST</h2>
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