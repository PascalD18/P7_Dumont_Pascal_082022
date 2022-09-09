import { useNavigate } from 'react-router-dom'
import '../../styles/BannerBtn.css'
import '../../styles/Btn.css'


function HomeButtons () {
    const navigate = useNavigate()

    const onClickHandler = (e) => {
        navigate(e.target.dataset.nav)
      }

    return (
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
    )
}
export default HomeButtons