import logo from '../assets/img/global/icon-logo_groupomania.png'
import '../styles/Banner.css'

function Banner() {

  return (
    <div className="banner_sect">
      <p id="Avertissement"></p>
      <img src={logo} alt='Groupomania' className="banner_logo" />
      <h1 className="banner_title">Boite à idées</h1>
    </div>

  )
}

export default Banner