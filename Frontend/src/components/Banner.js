import '../styles/Banner.css'
import logo from '../assets/img/global/icon-logo_groupomania.png'

// Aussi sous forme de fonction, on a : function Banner() {
const Banner = () => {
    const title = 'Groupomania'
     return (
        <div className='lmj-banner'>

            <img src={logo} alt='Groupomania' className='lmj-logo' />
            <h1 className='imj-title'>{title}</h1>
        </div>
    )
}

export default Banner