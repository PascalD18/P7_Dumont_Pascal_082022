import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ConnectLogin from './components/ConnectLogin'
import ConnectSignup from './components/ConnectSignup'
import AllPosts from './pages/AllPosts'
import SelectPost from './pages/SelectPost'
import NewPost from './pages/NewPost'

//Initialisation des Url de bases
const baseUrlBack = 'http://localhost:3001/api/'
sessionStorage.setItem("baseUrlBack", baseUrlBack)
const baseUrlFront = 'http://localhost:3000'
sessionStorage.setItem("baseUrlFront", baseUrlFront)

function App() {
  return(
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route exact path="/Connexion/Login" element={<ConnectLogin/>}/>
    <Route path="/Connexion/Signup" element={<ConnectSignup/>}/>
    <Route path="/AllPosts" element={<AllPosts/>}/>
    <Route path="/SelectPost" element={<SelectPost/>}/>
    <Route path="/NewPost" element={<NewPost/>}/>
    
    

    </Routes>
    </BrowserRouter>
    )

  
  }

  export default App

