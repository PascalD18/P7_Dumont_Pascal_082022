import { Link } from 'react-router-dom'
import '../styles/Home.css'
//import Banner from '../components/Banner'



// Aussi sous forme de fonction, on a : function Banner() {
const Home = () => {


    return (
        <div className="login">
            
            <nav >
                <div className="title">
                <Link to="/Connexion/signup">Inscription</Link>
                <Link to="/Connexion/login">Connexion</Link>
                </div>

            </nav>
        </div>
    )
}

export default Home
 //               <Link to="/Postes">Postes</Link>