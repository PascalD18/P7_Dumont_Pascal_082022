
import { useState } from 'react'
import axios from 'axios'
import OnSelect from "../../components/OnSelect"
import { useGlobalState } from '../../components/StateGlobal'
//import { useRouteLoaderData } from 'react-router-dom'

function PostLike({ like, postId, post, userId }) {

    const [resultLike, setResultLike] = useState(like)
    const baseUrlBack = useGlobalState('baseUrlBack')
    const authHeader = JSON.parse(sessionStorage.getItem('authHeader'))

    const onClickLike = (e) => {
        e.preventDefault();

        // 1ére requête POST pour liker (ou annuler le like) du post ( calcul géré par le backend)
        const baseUrlLike = `${baseUrlBack[0]}posts/${postId}/like`
        const headers = authHeader
        axios.post(baseUrlLike, { "like": 1 }, { headers })
            .then((res) => {

                //2éme Requête GET sur le post Liké, pour analyser le résultat
                const baseUrlReadOne = `${baseUrlBack[0]}posts/${postId}`
                axios.get(baseUrlReadOne, { headers })
                    .then((res) => {
                        setResultLike(res.data.likes)
                        document.getElementById(`Like{${postId}}`).innerHTML = resultLike
                       if( document.getElementById(`ThumbG{${postId}}`).classList[2] === 'Thumb_Visible'){
                        document.getElementById(`ThumbG{${postId}}`).className='SelectMouse ThumbG Thumb_Hidden'
                        document.getElementById(`ThumbH{${postId}}`).className='SelectMouse ThumbH Thumb_Visible'
                         }else{
                        document.getElementById(`ThumbG{${postId}}`).className='SelectMouse ThumbG Thumb_Visible'
                        document.getElementById(`ThumbH{${postId}}`).className='SelectMouse ThumbH Thumb_Hidden'
                      }
                    })
                    .catch((err) => { console.log(err) })
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <>
            <OnSelect handleClick={onClickLike}>
                {post.usersLiked.includes(userId) ? (
                    <>
                        <img id={`ThumbG{${postId}}`} src="/Thumb_up_green.jpg" alt="thumb"
                            className="SelectMouse ThumbG Thumb_Visible"></img>
                        <img id={`ThumbH{${postId}}`} src="/Thumb_up_hollow.jpg" alt="thumb"
                            className="SelectMouse ThumbH Thumb_Hidden"></img>
                    </ >
                ) : (
                    <>
                        <img id={`ThumbG{${postId}}`} src="/Thumb_up_green.jpg" alt="thumb"
                            className="SelectMouse ThumbG Thumb_Hidden"></img>
                        <img id={`ThumbH{${postId}}`} src="/Thumb_up_hollow.jpg" alt="thumb"
                            className="SelectMouse ThumbH Thumb_Visible"></img>
                    </>
                )}
            </OnSelect>
            <p id={`Like{${postId}}`} className="A_Text_Like">{resultLike}</p>
        </ >
    )
}
export default PostLike