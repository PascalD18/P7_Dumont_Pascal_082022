import logo from '../assets/img/global/icon-logo_groupomania.png'
import '../styles/Banner.css'

function Banner() {
  return (
    <div className="B_Sect">
      <div className="B_ContLogo">
        <img src={logo} alt='Groupomania' className="Logo" />
      </div>
      <h1 className="Title">Boite à idées</h1>
    </div>
  )
}
export default Banner