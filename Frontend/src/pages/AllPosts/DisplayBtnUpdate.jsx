import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setGlobalState } from '../../components/StateGlobal'

function DisplayBtnUpdate({ typeUser, userConnect, userPost, post, postId }) {
    const navigate = useNavigate()
    const [authDisplay, setAuthDisplay] = useState(false)
    const usersList = JSON.parse(sessionStorage.getItem('usersList'))

    useEffect(() => {

        // Affiche ou non , les boutons 'MODIFICATION' et 'SUPPRESSION' en fonction de:
        // Uniquement si l'utilisateur non administrateur est propriétaire du post
        // ou
        // Pour l'administrateur, qu'il soit propriétaire ou non
        if ((typeUser !== "Admin" && userConnect === userPost)
            ||
            (typeUser === "Admin" && userConnect !== userPost)
            ||
            (typeUser === "Admin" && userConnect === userPost)) {
            setAuthDisplay(true)
            return
        } else {
            setAuthDisplay(false)
        }
    }, [typeUser, userConnect, userPost]);

    const onClickUpDatePost = (e) => {
        e.preventDefault()
        sessionStorage.setItem('Post', e.target.dataset.post)
        setGlobalState('typeForm', 'UpDate')
        navigate('/FormNewUpDate')
    }
    const onClickDeletePost = (e) => {
        var email = usersList.find(el => el._id === post.userId).email
        var res = window.confirm(`Confirmez-vous la suppression du post émis le ${post.dateCreate} par ${email} ?`)
        if (res) {
            sessionStorage.setItem('PostId', e.target.dataset.postid)
            navigate('/DeletePost');
        } else {
            alert("Post non supprimé");
        }
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