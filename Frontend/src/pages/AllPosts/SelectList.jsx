import OnSelect from "../../components/OnSelect"
import { useNavigate } from 'react-router-dom';
import '../../styles/index.css'
import '../../styles/Form.css'
import './AllPosts.css'
import '../../styles/index.css'

function SelectList({ postsList }) {
    const navigate = useNavigate()
   
    const onClickHandler = (e) => {
        sessionStorage.setItem('PostId', e.target.dataset.id)
        sessionStorage.setItem('Post', e.target.dataset.post)
        navigate('/SelectPost')
    }
    return (

        <div className="sectList">
            {postsList.map((post) => (
                <div className="list_grp">
                    <div className="list_grp_cont">
                        <OnSelect
                            handleClick={onClickHandler}>
                            <p className="text_data selectMouse"
                                data-post={JSON.stringify(post)}
                                data-id={post._id}
                            >
                                {post.dateCreate}</p>
                        </OnSelect>
                        <p className="text_data">{post.lastName}</p>
                        <p className="text_data">{post.firstName}</p>
                    </div>
                    <div className="listCont_img">
                        <img className="img_post" src={post.imageUrl} alt="avatar"></img>
                    </div>
                    <textarea className="list_Textarea">{post.description}</textarea>
                </div>
            ))}
            <div />
        </div>
    )
}
export default SelectList
