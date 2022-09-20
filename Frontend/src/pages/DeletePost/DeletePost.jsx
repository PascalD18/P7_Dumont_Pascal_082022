import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//import AllPosts from  '../AllPosts/AllPosts'


function DeletePost() {
    const navigate = useNavigate()

    // Supprime un post
    useEffect(() => {
        const postId = sessionStorage.getItem('PostId')
        const baseUrlBack = sessionStorage.getItem("baseUrlBack")
        const baseUrl = `${baseUrlBack}posts/${postId}`
        const headers = JSON.parse(sessionStorage.getItem('authHeader'))

        axios.delete(baseUrl, { headers })
            .then(() => {
                navigate('/AllPosts')
            })
            .catch((err) => { console.log(err) })

    });
}
export default DeletePost