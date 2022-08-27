import { Link } from 'react-router-dom'
import '../styles/Banner.css'
//import Banner from '../components/Banner'



// Aussi sous forme de fonction, on a : function Banner() {
const Home = () => {


    return (
        <div>
            
            <nav>
                <Link to="/Connexion/signup">Inscription</Link>
                <Link to="/Connexion/login">Connexion</Link>
                <Link to="/Postes">Postes</Link>
            </nav>
        </div>
    )
}

export default Home