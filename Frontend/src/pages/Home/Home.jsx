//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/img/global/icon-logo_groupomania.png'
import './Home.css'
import '../../styles/index.css'

const Home = () => {

  sessionStorage.clear('usersList')
  sessionStorage.clear('userId')
  sessionStorage.clear('Post')
  sessionStorage.clear('usersList')
  sessionStorage.clear('userId')
  sessionStorage.clear('authHeader')





  const navigate = useNavigate()
  sessionStorage.setItem("baseUrlBack", 'http://localhost:3001/api/')
 
  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }

  return (

    <div className="B_Sect">
      <img src={Logo} alt='Groupomania' className="Logo" />
      <h1 className="Title">Boite à idées</h1>
      <div className="B_GrpBtn">
        <div className="B_GrpBtn_ContRight">
          <button className="Btn_Listening"
            data-nav="/Signup"
            onClick={onClickHandler}
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
export default Home