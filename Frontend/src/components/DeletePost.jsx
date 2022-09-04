import axios from 'axios'
import AllPosts from  '../pages/AllPosts'


function DeletePost() {

    //const navigate = useNavigate()

    // État de navigation transmit au module 'Banner', pour le paramétrage de la mise en forme de ses liens
    sessionStorage.setItem('stateNav', "Liste des posts")

        const post = JSON.parse(sessionStorage.getItem('Post'))
        const postId = post._id;
        const baseUrlBack = sessionStorage.getItem("baseUrlBack")
        const baseUrl = `${baseUrlBack}posts/${postId}`
        const token = localStorage.getItem('token')
        const headers = {
            "Authorization": `Bearer ${token}`
        }

        axios.delete(baseUrl, { headers })
            .then(() => {
                console.log("post supprimé")
                if (post.length ===0){
                    sessionStorage.setItem('SatePosts',"vide")
                }else{
                    sessionStorage.setItem('SatePosts',"non vide")
                }
                
            })
            .catch((err) => { console.log(err) })

    return (
        <div><AllPosts/></div>
        )
}
export default DeletePost