
import { useState } from 'react'
import axios from 'axios'
import OnSelect from "../../components/OnSelect"
import { useGlobalState } from '../../components/StateGlobal'

function PostLike({ like, postId }) {

    const [resultLike, setResultLike] = useState(like)
    const baseUrlBack = useGlobalState('baseUrlBack')
    const authHeader = useGlobalState('authHeader')

    const onClickLike = (e) => {
        e.preventDefault();

        // 1ére requête POST pour liker (ou annuler le like) du post ( calcul géré par le backend)
        const baseUrlLike = `${baseUrlBack[0]}posts/${postId}/like`
        const headers = authHeader[0]
        axios.post(baseUrlLike, { "like": 1 }, { headers })
            .then((res) => {

                //2éme Requête GET sur le post Liké, pour analyser le résultat
                const baseUrlReadOne = `${baseUrlBack[0]}posts/${postId}`
                axios.get(baseUrlReadOne, { headers })
                    .then((res) => {
                        setResultLike(res.data.likes)
                        document.getElementById(`Like{${postId}}`).innerHTML = resultLike
                    })
                    .catch((err) => { console.log(err) })
            })
            .catch((err) => { console.log(err) })
    }
    return (
        <>
            <OnSelect handleClick={onClickLike}>
                {resultLike === 0 ? (
                    <img src="/Thumb_up_hollow.jpg" alt="thumb"
                        className="SelectMouse Thumb"></img>
                ) : (
                    <img src="/Thumb_up_green.jpg" alt="thumb"
                        className="img_Thumb SelectMouse Thumb"></img>
                )}
            </OnSelect>
            <p id={`Like{${postId}}`} className="A_Text_Like">{resultLike}</p>
        </ >
    )
}
export default PostLike