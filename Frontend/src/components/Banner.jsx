import logo from '../assets/img/global/icon-logo_groupomania.png'
import '../styles/Banner.css'

const Banner =() =>{
const title = 'Boite à idées'

return(
  <div >

 <img src={logo} alt='Groupomania' className="logo"/> 
            <h1 >{title}</h1>

  </div>
  )
}
export default Banner