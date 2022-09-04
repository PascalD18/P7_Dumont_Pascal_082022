import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import OnSelect from "../components/OnSelect"
import Banner from '../components/Banner'
import NewPost from './NewPost'
import '../styles/Test.css'
import '../styles/AllPosts.css'


// Affichage de tous les posts
function AllPosts() {

    // État de navigation transmit au module 'Banner', pour le paramétrage de la mise en forme de ses liens
    sessionStorage.setItem('stateNav', "Liste des posts")

    // Affichage de tous les posts
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {

        const baseUrlBack = sessionStorage.getItem("baseUrlBack");
        const baseUrl = `${baseUrlBack}posts/`
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Bearer ${token}`,
        }
        //localStorage.setItem('headers', { headers })
        axios.get(baseUrl, { headers })
            .then((res) => {
                setPosts(res.data)
                sessionStorage.setItem('Posts', JSON.stringify(res.data))
                if (res.data.length === 0) {
                    sessionStorage.setItem('StatePosts', "vide")
                    sessionStorage.setItem('stateNav', "Nouveau post")
                } else {
                    sessionStorage.setItem('StatePosts', "non vide")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const onClickHandler = (e) => {
        //sessionStorage.setItem('PostId', e.target.dataset.id)
        sessionStorage.setItem('Post', e.target.dataset.post)
        navigate('/SelectPost')
    }

    return (
        <div>
            <div>
            { sessionStorage.getItem('StatePosts') === "vide" ? (
             <NewPost/>
            ):(
              <Banner />
            )}
            </div>
            <div>
                <ul>
                    {posts.map((post) => (
                        <div >
                            <OnSelect handleClick={onClickHandler}>
                                <div className="container">

                                    <h1
                                        data-post={JSON.stringify(post)}
                                    >
                                        {post.lastName}</h1>

                                </div>
                            </OnSelect>
                            <textarea className="description">{post.description}</textarea>
                        </div>
                    ))}

                </ul >
            </div>
        </div >
    )
}

export default AllPosts