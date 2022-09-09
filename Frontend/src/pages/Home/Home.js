import { Link } from 'react-router-dom'
import Banner from '../../components/Banner'
import HomeButtons from './HomeButtons'
import '../../styles/Btn.css'

const Home = () => {
    localStorage.clear('token')
    return ( 
        <div>
            <Banner />,
            <Link to="/"></Link>,
            <HomeButtons/>
            
        </div>
    )
}
export default Home