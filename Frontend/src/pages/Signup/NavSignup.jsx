import { useNavigate } from 'react-router-dom'
import '../../styles/index.css'
import './Signup.css'

function NavSignup() {
  const navigate = useNavigate()
  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }
  return (
    <div className="SNav_Sect">
      <button className="Btn_Listening"
        data-nav="/Login"
        onClick={onClickHandler}
      >
        CONNEXION
      </button>
      <div className="SContSubTitle">
        <p className="SubTitle">INSCRIPTION</p>
      </div>
    </div>
  )
}
export default NavSignup