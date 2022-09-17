import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
//import UpDatePost from '../UpDatePost/UpDatePost'
//import UpDatePost from '../UpDatePost/UpDatePost';

function DisplayBtnUpdate({ typeUser, userConnect, userPost, post, postId }) {
    const navigate = useNavigate()
    const [authDisplay, setAuthDisplay] = useState(false)


    useEffect(() => {
        // function DefDisplay() {
        // Définie l'autorisation de modif ou suppression 'authUpdate' en fonction de :
        // L'utilisateur connecté (userId) = Émetteur du Post ( userPost )
        // Ou si l'utilisateur connecté est administrateur ( typeUser = "Admin")
        if ((userConnect === userPost && typeUser !== "Admin") 
        || 
        (userConnect !== userPost && typeUser === "Admin")
        ||
        (userConnect === userPost && typeUser === "Admin")  )
        {
            setAuthDisplay(true)
            return
        } else {
            setAuthDisplay(false)
        }

    },[typeUser,userConnect,userPost]);

     const onClickUpDatePost =(e) => {
        e.preventDefault()
        
        sessionStorage.setItem('Post',e.target.dataset.post)
        navigate('/UpDatePost')
     }
     const onClickDeletePost = (e) => {
        e.preventDefault()
         sessionStorage.setItem('PostId',e.target.dataset.postid)
         navigate('/DeletePost')

     }

    return (
        <div>

            {authDisplay === true && (
                <>
                <button id={`M${postId}`} className="Btn_Listening"
                 data-post={JSON.stringify(post)}
                    onClick={onClickUpDatePost}
                >
                    MODIFICATION
                </button>
                <div>                
                            <button id={`S${postId}`} className="Btn_Listening"
                            data-postid={postId}
                            onClick={onClickDeletePost}
                           >
                               SUPPRESSION
                           </button>
                           </div>

                           </>      
            )}
    
        </div>)
}
export default DisplayBtnUpdate