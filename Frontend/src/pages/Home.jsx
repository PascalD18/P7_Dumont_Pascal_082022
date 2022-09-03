import Banner from '../components/Banner'

//import AddEventListener from '../components/AddEventListener'

// Aussi sous forme de fonction, on a : function Banner() {
const Home = () => {
    sessionStorage.setItem('stateNav',"Home")
    return ( 
        <div>
            <Banner />
        </div>
    )
}
export default Home