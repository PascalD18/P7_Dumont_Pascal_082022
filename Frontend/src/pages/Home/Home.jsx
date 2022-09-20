import { useNavigate } from 'react-router-dom'
import Banner from '../../components/Banner'
import './Home.css'
import '../../styles/index.css'

const Home = () => {
  sessionStorage.clear('usersList')
  sessionStorage.clear('userId')
  sessionStorage.clear('Post')
  sessionStorage.clear('usersList')
  sessionStorage.clear('userId')
  sessionStorage.clear('authHeader')

  // Initialisation du Header de départ pour l'entête des requêtes de l'API
  const baseHeader = {
    "Accept": `application/json`,
    "Accept-Language": `fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3`,
    "Content-type": `application/json; charset=utf-8`
  }
  sessionStorage.setItem('baseHeader', JSON.stringify(baseHeader))
  const navigate = useNavigate()
  sessionStorage.setItem("baseUrlBack", 'http://localhost:3001/api/')
  const onClickHandler = (e) => {
    navigate(e.target.dataset.nav)
  }
  return (
    <div>
      <div><Banner /></div>
      <div>
        <div className="HNav_Sect">
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