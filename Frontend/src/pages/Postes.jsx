//import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';




// Affichage de tous les postes
function Postes() {


    // Affichage de tous les postes
    const [postes, setPostes] = useState([]);

    useEffect(() => {
        const baseUrlBack = sessionStorage.getItem("baseUrlBack");
        const baseUrl = `${baseUrlBack}/postes/`
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Bearer ${token}`,
        }
        localStorage.setItem('headers', { headers })
        axios.get(baseUrl, { headers })
            .then((res) => {
                setPostes(res.data)
            })
            .catch((err) => {
                console.log(err)
                //alert (err.response.data.error)
            })
    }, []);

    return (
        <div>
            <nav>
                <Link to="/NewPoste">Création Poste</Link>
            </nav>
            <ul>
                {postes.map((poste) => (
                    <option 
                        value={poste._id}
                        onClick={e=>{
                            var posteLinea = JSON.stringify(poste)
                            localStorage.setItem('Poste', {posteLinea})
                          
                          window.location.replace('http://localhost:3000/Poste')
                        }
                    }
                    >{poste.name}
                    </option>
                ))
                }
            </ul>
        </div>
    )
}

export default Postes