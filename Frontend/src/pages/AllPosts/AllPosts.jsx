import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//import { Navigate } from 'react-router-dom'
import OnSelect from "../../components/OnSelect"
import axios from 'axios'
//import useForceUpdate from 'use-force-update'
import BannerAllPosts from './BannerAllPosts'
//import ListingPosts from './ListingPosts'
//import SelectList from './SelectList'
import './AllPosts.css'
import '../../styles/index.css'

// Affichage de tous les posts
function AllPosts() {
    const navigate = useNavigate()
    const [postsList, setPostsList] = useState([])
    const userId = localStorage.getItem('userId')

    useEffect((postsList) => {
        const baseUrlBack = sessionStorage.getItem("baseUrlBack");
        const baseUrlPosts = `${baseUrlBack}posts/`
        const headers = JSON.parse(localStorage.getItem('authHeader'))

        //Requête de tous les postes
        axios.get(baseUrlPosts, { headers })
            .then((res) => {
                setPostsList(res.data);
                sessionStorage.setItem('Posts', JSON.stringify(postsList));
            })
            .catch((err) => { alert(err) })
    }, ([]));
    const onClickLike = (e) => {
        e.preventDefault();
        const headers = JSON.parse(localStorage.getItem('authHeader'))
        const baseUrlBack = sessionStorage.getItem("baseUrlBack");

        // 1ére requête POST pour liker (ou annuler le like) du post ( calcul géré par le backend)
        const postId = e.target.dataset.postid
        const baseUrlLike = `${baseUrlBack}posts/${postId}/like`
        axios.post(baseUrlLike, { "like": 1 }, { headers })
            .then((res) => {

                //2éme Requête GET sur le post Liké, pour analyser le résultat
                const baseUrlReadOne = `${baseUrlBack}posts/${postId}`
                axios.get(baseUrlReadOne, { headers })
                    .then((res) => {
                        window.location.reload()
                    })
                    .catch((err) => { console.log(err) })
            })
            .catch((err) => { console.log(err) })
    }
    const HandleUpDate = (e) => {
        e.preventDefault()

         //Accès à la mise à jour ou suppression
         sessionStorage.setItem('PostId', e.target.dataset.postid)
         sessionStorage.setItem('Post', e.target.dataset.post)
         navigate('/UpDatePost')
    }
    return (
        <div>
            <div><BannerAllPosts /></div>
            <div className="A_Sect">

                {postsList.map((post) => (
                    <div key={post._id} className="A_Grp">
                        <div className="A_Grp_ContDatas">
                            <div className="A_Grp_ContDatas_ContDataNames">

                                {/*On ne met un lien pour modif ou suppression
                                   uniquement si le post corresponds à l'utilisateur connecté
                                   ou si l'utilisateur est l'administrateur */}
                                {(userId === post.userId || userId === process.env.ADMIN) ? (
                                    <OnSelect handleClick={HandleUpDate}>
                                        <p className="Text_Data SelectMouse"
                                            data-post={JSON.stringify(post)} data-postid={post._id}
                                        >
                                            {post.dateCreate}</p>
                                    </OnSelect>
                                ) : (
                                    <p className="A_Text_Data_Disable">{post.dateCreate}</p>
                                )}
                                <p className="Text_Data">{post.lastName}</p>
                                <p className="Text_Data">{post.firstName}</p>
                            </div>
                            <div className="A_Grp_ContImg">
                                <img className="img_post" src={post.imageUrl} alt="illustration"></img>
                            </div>
                            <textarea defaultValue={post.description}
                                className="A_Textarea"></textarea>
                        </div>
                        <div className="A_Grp_ContLike">
                            <div className="A_Grp_ContLike_ContThumb">
                                <OnSelect handleClick={onClickLike}>
                                    {post.likes === 0 ? (
                                        <>
                                            <img src="/Thumb up hollow.jpg" id={post._id} data-postid={post._id} alt="thumb"
                                                className="SelectMouse"></img>
                                        </>
                                    ) : (
                                        <>
                                            <img src="/Thumb up green.jpg" id={post._id} data-postid={post._id} alt="thumb"
                                                className=" img_Thumb SelectMouse"></img>
                                        </>
                                    )}
                                </OnSelect>
                            </div>
                            <p >{post.likes}</p>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default AllPosts

