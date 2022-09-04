import Banner from '../components/Banner'

const Home = () => {
    sessionStorage.setItem('stateNav',"Home")
    return ( 
        <div>
            <Banner />
        </div>
    )
}
export default Home