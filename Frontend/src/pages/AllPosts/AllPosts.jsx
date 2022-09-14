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
    //const [counter,setCounter] = useState(0)

    //const [classeMouse, setClasseMouse] = useState('')
    const userId = localStorage.getItem('userId')
    //const [colorThumb, setColorThumb] = useState('')



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

                        //On relie les posts avec les données calculées par le backend  
                        setPostsList(...postsList,postsList)
                        navigate('/AllPosts')

                    })
                    .catch((err) => { console.log(err) })
            })

            .catch((err) => { console.log(err) })

    }

    function HandleUpDate(e) {
        e.preventDefault()

        sessionStorage.setItem('PostId', e.target.dataset.postid)
        sessionStorage.setItem('Post', e.target.dataset.post)

        if (userId === e.target.dataset.userid) {
            navigate('/UpDatePost')
        }

    }

    return (
        <div>
            <BannerAllPosts />
            <div className="A_Sect">
                {postsList.lenght !== 0 ? (
                    postsList.map((post) => (
                        <div key={post._id} className="A_Grp">
                            <div className="A_Grp_ContDatas">
                                <div className="A_Grp_ContDatas_ContDataNames">
                                    <OnSelect handleClick={HandleUpDate}>
                                        <p className="Text_Data SelectMouse"
                                            data-post={JSON.stringify(post)}
                                            data-postid={post._id}
                                            data-userid={post.userId}
                                        >
                                            {post.dateCreate}</p>
                                    </OnSelect>
                                    <p className="Text_Data">{post.lastName}</p>
                                    <p className="Text_Data">{post.firstName}</p>
                                </div>
                                <div className="A_Grp_ContImg">
                                    <img className="img_post" src={post.imageUrl} alt="avatar"></img>
                                </div>
                                <textarea value="Default" className="A_Textarea">{post.description}</textarea>
                            </div>
                            <div className="A_Grp_ContLike">
                                <div className="A_Grp_ContLike_ContCentre">
                                    <OnSelect handleClick={onClickLike}>

                                        {post.likes === 0 ? (
                                            <i data-postid={post._id} className="fas fa-solid fa-thumbs-up Thumb ThumbGrey"></i>
                                        ) : (
                                            <i data-postid={post._id} className="fas fa-solid fa-thumbs-up Thumb ThumbGreen"></i>
                                        )}

                                    </OnSelect>
                                    <p >{post.likes}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Liste de posts vide</p>
                )}
            </div>
        </div>
    )
}

export default AllPosts

//