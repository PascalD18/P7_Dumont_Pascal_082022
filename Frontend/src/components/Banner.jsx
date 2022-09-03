import logo from '../assets/img/global/icon-logo_groupomania.png'
import '../styles/Banner.css'
import '../styles/index.css'
import '../styles/LinkBtn.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OnSelect from "./OnSelect"


function Banner() {

  const navigate = useNavigate()

  //Variables pour configurer l'affichage des liens
  // pour tous les postes
  const [classLinkPosts, setClassLinkPosts] = useState('')
  const [displayLinkPosts, setDisplayLinkPosts] = useState('')
  const [activeLinkPosts,setActiveLinkPosts]=useState(false)

  // pour un nouveau post
  const [classLinkPost, setClassLinkPost] = useState('')
  const [displayLinkPost, setDisplayLinkPost] = useState('')
  const [activeLinkPost,setActiveLinkPost]=useState(false)

  // pour l'inscription utilisateur
  const [classLinkSignup, setClassLinkSignup] = useState('')
  const [displayLinkSignup, setDisplayLinkSignup] = useState('')
  const [activeLinkSignup,setActiveLinkSignup]=useState(false)

  // pour le login utilisateur
  const [classLinkLogin, setClassLinkLogin] = useState('')
  const [valueLinkLogin, setValueLinkLogin] = useState('')
  const [activeLinkLogin,setActiveLinkLogin]=useState(false)



  const title = 'Boite à idées'

  useEffect(() => {

    // configuration des 4 liens en fonction de l'étape de navigation
    const stateNav = sessionStorage.getItem("stateNav")

    if (stateNav === "Home") {

      // pour connexion ou inscription (page d'entrée du site)
      setDisplayLinkPosts("banner_no_display_link")
      setDisplayLinkPost("banner_no_display_link")
      setClassLinkSignup("link_listening"); setActiveLinkSignup(true)
      setDisplayLinkSignup("banner_display_link")
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('CONNEXION')

      // pour la connexion d'un utilisateur
    } else if (stateNav === "Connexion") {
      setDisplayLinkPosts("banner_no_display_link")
      setDisplayLinkPost("banner_no_display_link")
      setDisplayLinkSignup("banner_display_link")
      setClassLinkSignup("link_listening"); setActiveLinkSignup(true)
      setDisplayLinkSignup("banner_display_link")
      setClassLinkLogin("link_selected"); setActiveLinkLogin(false)
      setValueLinkLogin('CONNEXION')

      // pour l'inscription d'un utilisateur
    } else if (stateNav === "Inscription") {
      setDisplayLinkPosts("banner_no_display_link")
      setDisplayLinkPost("banner_no_display_link")
      setDisplayLinkSignup("banner_display_link")
      setClassLinkSignup("link_selected"); setActiveLinkSignup(false)
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('CONNEXION')


      // pour l'affichage de tous les postes
    } else if (stateNav === "Liste des posts") {
      setDisplayLinkPosts("banner_display_link")
      setClassLinkPosts("link_selected"); setActiveLinkPosts(false)
      setDisplayLinkPost("banner_display_link")
      setClassLinkPost("link_listening"); setActiveLinkPost(true)
      setDisplayLinkSignup("banner_no_display_link")
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('DÉCONNEXION')

      // pour un post sélectionné
    } else if (stateNav === "Post sélectionné") {
      setDisplayLinkPosts("banner_display_link")
      setClassLinkPosts("link_listening"); setActiveLinkPosts(true)
      setDisplayLinkPost("banner_display_link")
      setClassLinkPost("link_selected"); setActiveLinkPost(false)
      setDisplayLinkSignup("banner_no_display_link")
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('DÉCONNEXION')
    
    
      // pour un nouveau post
    } else if (stateNav === "Nouveau post") {
      setDisplayLinkPosts("banner_display_link")
      setClassLinkPosts("link_listening"); setActiveLinkPosts(true)
      setDisplayLinkPost("banner_display_link")
      setClassLinkPost("link_selected"); setActiveLinkPost(false)
      setDisplayLinkSignup("banner_no_display_link")
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('DÉCONNEXION')
    }
  }, [])


  const onClickHandler = (e) => {
    if (e.target.dataset.active === 'true'){
      navigate(e.target.dataset.nav)
    }
    
  }

  return (

    <div className="banner_sect">

      <img src={logo} alt='Groupomania' className="banner_logo" />
      <h1 className="banner_title">{title}</h1>

      <div class="banner_grp_link">
        <div className="banner_grp_link_cont">

          {/*Lien pour affichage de tous les postes */}
          <div>
            <OnSelect handleClick={onClickHandler}>
              <div className={`${displayLinkPosts} ${classLinkPosts}`}
               data-nav="/AllPosts"
               data-active={activeLinkPosts}
               >
                LISTE DES POSTES
              </div>
            </OnSelect>
          </div>


          {/*Lien pour la création dun nouveau poste */}
          <div>
            <OnSelect handleClick={onClickHandler}>
              <div className={`${displayLinkPost} ${classLinkPost}`}
               data-nav="/NewPost"
               data-active={activeLinkPost}
               >
                NOUVEAU POSTE
              </div>
            </OnSelect>
          </div>
        </div>
        <div className="banner_grp_link_cont">

          {/*Lien pour l'inscription d'un utilisateur */}
          <div>
            <OnSelect handleClick={onClickHandler}>
              <div className={`${displayLinkSignup} ${classLinkSignup}`}
                data-nav="/Connexion/Signup"
                data-active={activeLinkSignup}
                >
                INSCRIPTION
              </div>
            </OnSelect>
          </div>

          {/*Lien pour CONNEXION ou DÉCONNEXION d'un utilisateur */}
          <div>
            <OnSelect handleClick={onClickHandler}>
              <div className={`${classLinkLogin}`}
               data-nav="/Connexion/Login"
                data-active={activeLinkLogin}
                >
                {valueLinkLogin} 
              </div>
            </OnSelect>
          </div>
        </div>

      </div>
    </div>

  )
}
export default Banner
 //
