import axios from 'axios'
import { useEffect } from 'react'
//import AllPosts from  '../AllPosts/AllPosts'


function DeletePost() {
    // Supprime un post
    useEffect(() => {
        //const postDelete=JSON.parse(postSelected)
        const postDelete = JSON.parse(sessionStorage.getItem('Post'))
        const postId = postDelete._id;
        const baseUrlBack = sessionStorage.getItem("baseUrlBack")
        const baseUrl = `${baseUrlBack}posts/${postId}`
        const headers=JSON.parse(localStorage.getItem('AuthHeader'))
        axios.delete(baseUrl, { headers })
            .then(() => {
                alert("post supprimé")
                if (postDelete.length === 0) {
                    sessionStorage.setItem('StatePosts', "vide")
                } else {
                    sessionStorage.setItem('StatePosts', "non vide")
                }

            })
            .catch((err) => { console.log(err) })
    });
}
export default DeletePost