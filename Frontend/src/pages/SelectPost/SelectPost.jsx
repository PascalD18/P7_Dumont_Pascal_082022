import { useEffect } from 'react'
import BannerSelectPost from './BannerSelectPost'
import GrpBtnUpDate from './GrpBtnUpDate'
import '../../styles/Banner.css'
import './SelectPost.css'
import '../../styles/index.css'
import '../../styles/Btn.css'


// Affichage d'un post selectionné depuis la liste de '/AllPosts'
function SelectPost() {
    const post = JSON.parse(sessionStorage.getItem('Post'));
    useEffect(() => {
    }, []);
    //Ne fait rien si 'authNav' est invalidé
    if (localStorage.getItem('authNav' === 'false')) { return }
    return (
        <div className="cont_page">
            <div><BannerSelectPost /></div>
            <div className="sectSelect">
                <div className="grpData">
                    <div className="grpData_cont_dataName">
                        <p className="text_data"> {post.dateCreate}</p>
                        <p className="text_data">{post.firstName}</p>
                        <p className="text_data">{post.lastName}</p>
                    </div>
                    <div className="grpData_cont_dataDescr">
                        <textarea className="text_data">
                            {post.description}
                        </textarea>
                        <div className="selectCont_img">
                            <img className="img_post"
                                src={post.imageUrl} alt="image_selected" ></img>
                        </div>
                    </div>
                </div>
                <div className="grpAction">
                    <div className="grpAction_contBtn">
                       { localStorage.getItem('userId') === post.userId ? (
                        <div><GrpBtnUpDate /></div>
                       ):(
                       <p>Pas de boutons</p>
                        ) 
                        }
                    </div>
                    <div className="grpAction_contLike">
                        <i className="fas fa-thumbs-up"></i>
                        <p className="text_data">{`post.like`}</p>
                    </div>
                </div>

            </div>
        </div>

    )

}
export default SelectPost
