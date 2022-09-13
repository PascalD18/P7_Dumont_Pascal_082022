//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/img/global/icon-logo_groupomania.png'
import '../../styles/index.css'
import './Signup.css'

function HomeButtons() {
  const navigate = useNavigate()

  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }

  return (
    <div className="B_Sect">
      <img src={Logo} alt='Groupomania' className="Logo" />
      <h1 className="Title">Boite à idées</h1>
      <div className="B_GrpBtn">
        <div className="B_GrpBtn_ContRight">
          <button className="Btn_Selected"
            disabled='false'
          >
            INSCRIPTION
          </button>
          <button className="Btn_Listening"
            data-nav="/Login"
            onClick={onClickHandler}
          >
            CONNEXION
          </button>
        </div>
      </div>
    </div>
  )
}
export default HomeButtons