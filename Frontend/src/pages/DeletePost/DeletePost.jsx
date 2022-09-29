import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from '../../components/StateGlobal'

function DeletePost() {
    const navigate = useNavigate()
    const baseUrlBack = useGlobalState('baseUrlBack')
    const authHeader=JSON.parse(sessionStorage.getItem('authHeader'))
    
    // Supprime un post
    useEffect(() => {
        const postId = sessionStorage.getItem('PostId')
        const headers = authHeader
        const baseUrl = `${baseUrlBack[0]}posts/${postId}`
        axios.delete(baseUrl, { headers })
            .then(() => {
                navigate('/AllPosts')
            })
            .catch((err) => { console.log(err) })
    });
}
export default DeletePost