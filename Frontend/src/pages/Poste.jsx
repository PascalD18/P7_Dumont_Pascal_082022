import React from 'react'
//import { useState, us} from 'react'
//import axios from 'axios'
//import { Link } from 'react-router-dom';

// Affichage d'un poste
function Poste() {

    // Affichage d'un poste'

    const poste = JSON.parse(localStorage.getItem('Poste'))


    return (
        <div>
            <p>Affichage d'un poste</p>
            <ul>
                {poste.map((data) => (
                    <li>
                        {data.name}
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default Poste