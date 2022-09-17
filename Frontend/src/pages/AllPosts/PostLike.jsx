
import {useState} from 'react'
import axios from 'axios'
import OnSelect from "../../components/OnSelect"

function PostLike({ like, postId }) {

    const [resultLike, setResultLike] = useState(like)

    const onClickLike = (e) => {
        e.preventDefault();
        const headers = JSON.parse(sessionStorage.getItem('authHeader'))
        const baseUrlBack = sessionStorage.getItem("baseUrlBack");

        // 1ére requête POST pour liker (ou annuler le like) du post ( calcul géré par le backend)
        const baseUrlLike = `${baseUrlBack}posts/${postId}/like`
        axios.post(baseUrlLike, { "like": 1 }, { headers })
            .then((res) => {

                //2éme Requête GET sur le post Liké, pour analyser le résultat
                const baseUrlReadOne = `${baseUrlBack}posts/${postId}`
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
                    
                        <img src="/Thumb up hollow.jpg" alt="thumb"
                            className="SelectMouse"></img>
                    
                ) : (
                    
                        <img src="/Thumb up green.jpg"  alt="thumb"
                            className=" img_Thumb SelectMouse"></img>
                    
                )}
                

            </OnSelect>
            <p id={`Like{${postId}}`} className="Text_Data">{resultLike}</p>
        </ >
    )

}
export default PostLike