import { useState } from 'react'
import { useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
//import { Navigate } from 'react-router-dom'
//import OnSelect from "../../components/OnSelect"
import axios from 'axios'
//import useForceUpdate from 'use-force-update'
import BannerAllPosts from './BannerAllPosts'
import PostLike from './PostLike'
import DisplayBtnUpDate from './DisplayBtnUpdate'
//import ListingPosts from './ListingPosts'
//import SelectList from './SelectList'
import './AllPosts.css'
import '../../styles/index.css'

// Affichage de tous les posts
const AllPosts = () => {
    const [postsList, setPostsList] = useState([])
    const usersList = JSON.parse(sessionStorage.getItem('usersList'))
    const userId = sessionStorage.getItem('userId')

    useEffect((postsList) => {
        const baseUrlBack = sessionStorage.getItem("baseUrlBack");
        const headers = JSON.parse(sessionStorage.getItem('authHeader'))

        //1ére Requête de tous les postes
        const baseUrlPosts = `${baseUrlBack}posts/`
        axios.get(baseUrlPosts, { headers })
            .then((res) => {
                setPostsList(res.data);
                sessionStorage.setItem('Posts', JSON.stringify(postsList));
            })
            .catch((err) => { alert(err) })
    }, ([]));

    return (
        <div>
            <div><BannerAllPosts /></div>
            <div className="A_Sect">
                {postsList.map((post) => (
                    <div key={post._id} className="A_Grp">
                        <div className="A_Grp_ContDatas">
                            <div className="A_Grp_ContDatas_ContEmis">
                                <div className="A_Grp_ContDatas_ContEmis_ContDate">
                                    <label className="Label_Data_Disable" htmlFor="Création post">Créé le:</label>
                                    <p className="Text_Data_Disable">{post.dateCreate}</p>
                                </div>
                                <label className="Label_Data_Disable" htmlFor="Email émetteur">Email émetteur</label>
                                <p className="Text_Data_Disable">
                                    {usersList.find(el => el._id === post.userId).email}
                                </p>

                                {/*  // Appel le composant qui affichera ou non les boutons de modification et suppression   */}
                                <DisplayBtnUpDate typeUser={usersList.find(el => el._id === userId).typeUser}
                                    userConnect={userId} userPost={post.userId} post={post} postId={post._id} />
                            </div>
                            <div className="A_Grp_ContImg">
                                <img className="img_post" src={post.imageUrl} alt="illustration"></img>
                            </div>
                            <textarea defaultValue={post.description}
                                className="A_Textarea"></textarea>
                        </div>
                        <div className="A_Grp_ContLike">
                            <div className="A_Grp_ContLike_ContThumb">
                                <PostLike like={post.likes} postId={post._id} />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
};

export default AllPosts

