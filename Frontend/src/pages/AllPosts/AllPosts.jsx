import { useEffect, useState} from 'react'
//import { Navigate } from 'react-router-dom'
import axios from 'axios'
import BannerAllPosts from './BannerAllPosts'
import SelectList from './SelectList'

// Affichage de tous les posts
function AllPosts() {
   const [postsList,setPostsList] = useState([])

    //Requête de tous les postes
    useEffect((postsList) => {
        
        const baseUrlBack = sessionStorage.getItem("baseUrlBack");
        const baseUrl = `${baseUrlBack}posts/`
        const headers=JSON.parse(localStorage.getItem('authHeader'))
        axios.get(baseUrl, { headers })
            .then((res) => {
                setPostsList(res.data)
                sessionStorage.setItem('Posts',JSON.stringify(postsList))
            })
            .catch((err) => {
                console.log(err)
            })
    },([]));

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