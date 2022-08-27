import { Link } from 'react-router-dom'
import '../styles/Banner.css'
//import Banner from '../components/Banner'



// Affichage de tous les postes
function Postes () {
   

    return (
        <div>
            <p>Postes existants</p>
            <nav>
                <Link to="/NewPoste">Nouveau Poste</Link>
            </nav>
        </div>
    )
}

export default Postes