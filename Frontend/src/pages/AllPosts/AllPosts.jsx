import { useEffect, useState } from 'react'
import axios from 'axios'
import BannerAllPosts from './BannerAllPosts'
import SelectList from './SelectList'

// Affichage de tous les posts
function AllPosts() {

    const [postsList, setPostsList] = useState([])


    //Requête de tous les postes
    useEffect((postsList) => {
        const baseUrlBack = sessionStorage.getItem("baseUrlBack");
        const baseUrl = `${baseUrlBack}posts/`
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Bearer ${token}`,
        }
        axios.get(baseUrl, { headers })
            .then((res) => {
                setPostsList(res.data)
                sessionStorage.setItem('Posts',JSON.stringify(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    },([]));
    //Ne fait rien si 'authNav' est invalidé
    if (localStorage.getItem('authNav' === 'false')) { return }
    return (
        <div>
            <BannerAllPosts />,
            { postsList.length !==0 ? (
               <SelectList postsList={postsList} /> 
               ):(
                <p>Liste de posts VIDE</p>
               )
            }
            
        </div>
    )
}

export default AllPosts