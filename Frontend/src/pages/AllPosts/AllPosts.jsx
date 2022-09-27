import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Banner from '../../components/Banner'
import NavAllPosts from './NavAllPosts'
import PostLike from './PostLike'
import DisplayBtnUpDate from './DisplayBtnUpdate'
import { useGlobalState } from '../../components/StateGlobal'
import './AllPosts.css'
import '../../styles/index.css'

// Affichage de tous les posts
const AllPosts = () => {
    const [postsList, setPostsList] = useState([])
    const usersList = JSON.parse(sessionStorage.getItem('usersList'))
    const userId = sessionStorage.getItem('userId')
    const baseUrlBack = useGlobalState("baseUrlBack")
    const authBearer = useGlobalState('authBearer')


    useEffect((postsList) => {
        //1ére Requête de tous les postes
        const baseUrlPosts = `${baseUrlBack[0]}posts/`
        const headers = authBearer[0]
        axios.get(baseUrlPosts, { headers })
            .then((res) => {
                setPostsList(res.data);
                sessionStorage.setItem('Posts', JSON.stringify(postsList));
            })
            .catch((err) => { alert(err) })
    }, ([]));

    return (
        <div>
            <div><Banner /></div>
            <div><NavAllPosts /></div>
            <div className="A_Sect">
                {postsList.length !== 0 ? (
                    <div>
                        {postsList.map((post) => (
                            <div key={post._id} className="A_Grp">
                                <div className="A_Grp_ContDatas">
                                    <div className="A_Grp_ContDatas_ContEmis">
                                        <div className="A_Grp_ContDatas_ContEmis_ContDate">
                                            <label className="Label_Data_Disable" htmlFor="Création post">Créé le:</label>
                                            <p className="Text_Data_Disable">{post.dateCreate}</p>
                                        </div>
                                        <label className="Label_Data_Disable" htmlFor="Email émetteur">Email émetteur</label>
                                        <p className="A_Text_Data_Disable">
                                            {usersList.find(el => el._id === post.userId).email}
                                        </p>
                                        {/*  // Appel le composant qui affichera ou non les boutons de modification et suppression */}
                                        <DisplayBtnUpDate typeUser={usersList.find(el => el._id === userId).typeUser}
                                            userConnect={userId} userPost={post.userId} post={post} postId={post._id} />
                                    </div>
                                    <div className="A_Grp_ContImg">
                                        <img className="img_post" src={post.imageUrl} alt="illustration"></img>
                                    </div>
                                    <textarea id={post._id} disabled="disabled"
                                        className="A_Textarea">
                                        {post.description}
                                    </textarea>
                                </div>
                                <div className="A_Grp_ContLike">
                                    <div className="A_Grp_ContLike_ContThumb">

                                        {/*  // Appel le composant qui gère les likes */}
                                        <PostLike like={post.likes} postId={post._id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Pas de posts en ce moment</p>
                )}
            </div>
        </div>
    )
};
export default AllPosts