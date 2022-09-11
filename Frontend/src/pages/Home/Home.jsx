import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import Banner from '../../components/Banner'
import './Home.css'
import '../../styles/Btn.css'

const Home = () => {
    localStorage.clear('token')
    const navigate = useNavigate()


    const onClickHandler = (e) => {
        navigate(e.target.dataset.nav)
      }
    return ( 
        <div>
            <Banner />,
            <Link to="/"></Link>,
            <div className="Bbtn_grp_btn">
            <div className="bBtn_grp_btn_cont">
                <button className="btn_listening"
                 data-nav="/Signup"
                 onClick={onClickHandler}
                 >
                INSCRIPTION
              </button>
              <button className="btn_listening"
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