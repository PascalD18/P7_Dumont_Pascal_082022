import { useNavigate } from 'react-router-dom'
import Banner from '../../components/Banner'
import { setGlobalState } from '../../components/StateGlobal'
import '../../styles/index.css'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  //Réinitialise les variables globales
  sessionStorage.clear('usersList')
  sessionStorage.clear('userId')
  sessionStorage.clear('Post')


  const onClickHandler = (e) => {
    setGlobalState("typeConnect", e.target.dataset.typeconnect)
    navigate('/FormConnect')
  }
  return (
    <div>
      <div><Banner /></div>
      <div>
        <div className="H_Nav_Sect">
          <button className="Btn_Listening"
            data-typeconnect="Signup"
            onClick={onClickHandler}
          >
            INSCRIPTION
          </button>
          <button className="Btn_Listening"
            data-typeconnect="Login"
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