import Banner from '../components/Banner'
import AllPostsButtons from '../pages/AllPosts/BannerAllPosts'
import SelectList from '../components/SelectList'
import NewPost from '../pages/NewPost/NewPost'

function Redirection() {
    const statePosts=sessionStorage.getItem('StatePosts')
    return (
        <div>
            {statePosts === "vide" ? (
                <div>
                <NewPost />
                </div>
            ) : (
                <div>
                <Banner />,
                <AllPostsButtons />,
                <SelectList />
                </div>
            )}
        </div>
    )
}
export default Redirection