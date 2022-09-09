
//import { useEffect,useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
//import DeletePost from '../../pages/DeletePost/DeletePost'
import '../../styles/Btn.css'

function GrpBtnUpDate() {

    const navigate = useNavigate()

    const onClickHandler = (e) => {
        navigate("/UpdatePost")
    }

    const onClickDeletePost = () => {
        const postDelete = JSON.parse(sessionStorage.getItem('Post'))
        const postId = postDelete._id;
        const baseUrlBack = sessionStorage.getItem("baseUrlBack")
        const baseUrl = `${baseUrlBack}posts/${postId}`
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Bearer ${token}`
        }

        axios.delete(baseUrl, { headers })
            .then(() => {
                alert("post supprimé");
                if (postDelete.length === 0) {
                    sessionStorage.setItem('SatePosts', "vide")
                } else {
                    sessionStorage.setItem('SatePosts', "non vide")
                };
                navigate("/AllPosts")
            })
            .catch((err) => { console.log(err) })
        }

    return (
        <div >
            {/*Bouton modification pour l'inscription d'un utilisateur */}
            <button className="btn_listening"
              onClick={onClickHandler}
            >
                MODIFICATION
            </button>
            {/*Bouton modification pour l'inscription d'un utilisateur */}
            <button  
                onClick={onClickDeletePost}
            >
                SUPPRESSION
            </button>
        </div >
    )
}
export default GrpBtnUpDate
