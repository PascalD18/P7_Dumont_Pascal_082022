import { useNavigate } from 'react-router-dom'
import '../../styles/index.css'
import './Login.css'

function NavLogin() {
  const navigate = useNavigate()

  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }
  return (
    <div className="LNav_Sect">
      <button className="Btn_Listening"
        data-nav="/Signup"
        onClick={onClickHandler}
      >
        INSCRIPTION
      </button>
      <div className="LContSubTitle">
        <p className="SubTitle">CONNEXION</p>
      </div>
    </div >
  )
}
export default NavLogin