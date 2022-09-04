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
  // pour afficher tous les postes
  const [classLinkPosts, setClassLinkPosts] = useState('')
  const [displayLinkPosts, setDisplayLinkPosts] = useState('')
  const [activeLinkPosts, setActiveLinkPosts] = useState(false)

  // pour créer un nouveau post
  const [classLinkPost, setClassLinkPost] = useState('')
  const [displayLinkPost, setDisplayLinkPost] = useState('')
  const [activeLinkPost, setActiveLinkPost] = useState(false)

  // pour supprimer un post
  const [classLinkDelete, setClassLinkDelete] = useState('')
  const [displayLinkDelete, setDisplayLinkDelete] = useState('')
  const [activeLinkDelete, setActiveLinkDelete] = useState(false)

  // pour l'inscription utilisateur
  const [classLinkSignup, setClassLinkSignup] = useState('')
  const [displayLinkSignup, setDisplayLinkSignup] = useState('')
  const [activeLinkSignup, setActiveLinkSignup] = useState(false)

  // pour le login utilisateur
  const [classLinkLogin, setClassLinkLogin] = useState('')
  const [valueLinkLogin, setValueLinkLogin] = useState('')
  const [activeLinkLogin, setActiveLinkLogin] = useState(false)



  const title = 'Boite à idées'

  useEffect(() => {

    // configuration des 4 liens en fonction de l'étape de navigation
    const stateNav = sessionStorage.getItem("stateNav")

    if (stateNav === "Home") {

      // pour connexion ou inscription (page d'entrée du site)
      setDisplayLinkPosts("link_no_display")
      setDisplayLinkPost("link_no_display")
      setDisplayLinkDelete("link_no_display")
      setClassLinkSignup("link_listening"); setActiveLinkSignup(true)
      setDisplayLinkSignup("link_display")
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('CONNEXION')

      // pour la connexion d'un utilisateur
    } else if (stateNav === "Connexion") {
      setDisplayLinkPosts("link_no_display")
      setDisplayLinkPost("link_no_display")
      setDisplayLinkDelete("link_no_display")
      setDisplayLinkSignup("link_display")
      setClassLinkSignup("link_listening"); setActiveLinkSignup(true)
      setClassLinkLogin("link_selected"); setActiveLinkLogin(false)
      setValueLinkLogin('CONNEXION')

      // Efface l'userId et le token pour obliger l'utilisateur à se reloger pour ce connecter.
      // ( protège l'accès si un autre utilisateur utilise le même pc )
      localStorage.clear('UserId'); localStorage.clear('token')

      // pour l'inscription d'un utilisateur
    } else if (stateNav === "Inscription") {
      setDisplayLinkPosts("link_no_display")
      setDisplayLinkPost("link_no_display")
      setDisplayLinkDelete("link_no_display")
      setDisplayLinkSignup("link_display")
      setClassLinkSignup("link_selected"); setActiveLinkSignup(false)
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('CONNEXION')


      // pour l'affichage de tous les postes
    } else if (stateNav === "Liste des posts") {
      setDisplayLinkPosts("link_display")
      setClassLinkPosts("link_selected"); setActiveLinkPosts(false)
      setDisplayLinkPost("link_display")
      setClassLinkPost("link_listening"); setActiveLinkPost(true)
      setDisplayLinkDelete("link_no_display")
      setDisplayLinkSignup("link_no_display")
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('DÉCONNEXION')

      // pour un post sélectionné
    } else if (stateNav === "Post sélectionné") {
      setDisplayLinkPosts("link_display")
      setClassLinkPosts("link_listening"); setActiveLinkPosts(true)
      setDisplayLinkPost("link_display")
      setClassLinkPost("link_listening"); setActiveLinkPost(true)
      setDisplayLinkDelete("link_display")
      setClassLinkDelete("link_listening"); setActiveLinkDelete(true)
      setDisplayLinkSignup("link_no_display")
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('DÉCONNEXION')


      // pour un nouveau post
    } else if (stateNav === "Nouveau post") {
      if (sessionStorage.getItem('StatePosts') === "non vide"){

        // Si la Bdd 'posts' n'est pas vide
        // => on active le lien d'affichage de tous les postes
        setDisplayLinkPosts("link_display")
        setClassLinkPosts("link_listening"); setActiveLinkPosts(true)
      }else {

        //Sinon on masque le lien qui donne l'affichage de tous les posts
        setDisplayLinkPosts("link_no_display")
      }
      setDisplayLinkPost("link_display")
      setClassLinkPost("link_selected"); setActiveLinkPost(false)
      setDisplayLinkDelete("link_no_display")
      setDisplayLinkSignup("link_no_display")
      setClassLinkLogin("link_listening"); setActiveLinkLogin(true)
      setValueLinkLogin('DÉCONNEXION')
    }
  }, [])


  const onClickHandler = (e) => {
    if (e.target.dataset.active === 'true') {
      navigate(e.target.dataset.nav)
    }

  }

  return (

    <div className="banner_sect">

      <img src={logo} alt='Groupomania' className="banner_logo" />
      <h1 className="banner_title">{title}</h1>

      <div className="banner_grp_link">
        <div className="banner_grp_link_cont">

          {/*Lien 'link_posts' pour affichage de tous les postes */}
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

          {/*Lien 'link_post' pour la création dun nouveau poste */}
          <div>
            <OnSelect handleClick={onClickHandler}>
              <div className={`${classLinkPost} ${displayLinkPost}`}
                data-nav="/NewPost"
                data-active={activeLinkPost}
              >
                NOUVEAU POSTE
              </div>
            </OnSelect>
          </div>
        </div>

        {/*Lien 'link_delete' pour supprimer le post */}
        <div>
          <OnSelect handleClick={onClickHandler}>
            <div className={`${classLinkDelete} ${displayLinkDelete}`}
              data-nav="/DeletePost"
              data-active={activeLinkDelete}
            >
              SUPPRIMER LE POST
            </div>
          </OnSelect>
        </div>
        <div className="banner_grp_link_cont">

          {/*Lien 'link_signup' pour l'inscription d'un utilisateur */}
          <div>
            <OnSelect handleClick={onClickHandler}>
              <div className={`${displayLinkSignup} ${classLinkSignup}`}
                data-nav="/Signup"
                data-active={activeLinkSignup}
              >
                INSCRIPTION
              </div>
            </OnSelect>
          </div>

          {/*Lien 'link_login' pour CONNEXION ou DÉCONNEXION d'un utilisateur */}
          <div>
            <OnSelect handleClick={onClickHandler}>
              <div className={`${classLinkLogin}`}
                data-nav="/Login"
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
 // <div className={`${displayLinkSignup} ${classLinkSignup}`}
