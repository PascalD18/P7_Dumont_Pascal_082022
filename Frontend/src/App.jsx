import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectRoute from './components/ProtectRoute'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import AllPosts from './pages/AllPosts/AllPosts'
import SelectPost from './pages/SelectPost/SelectPost'
import NewPost from './pages/NewPost/NewPost'
import UpDatePost from './pages/UpDatePost/UpDatePost'

//Initialisation de l'URL de base pour le routage de l'API
sessionStorage.setItem("baseUrlBack", 'http://localhost:3001/api/')

// Initialisation de l'emplacement de l'image dans le backend
sessionStorage.setItem("repImages", 'http://localhost:3001/images/')
 

// Initialisation du Header de départ pour l'entête des requêtes de l'API
const baseHeader = {
  "Accept": `application/json`,
  "Accept-Language": `fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3`,
  "Content-type": `application/json; charset=utf-8`
}
sessionStorage.setItem('baseHeader',JSON.stringify(baseHeader))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AllPosts" element={
          <ProtectRoute>
            <AllPosts />
          </ProtectRoute>
        } />
        <Route path="/SelectPost" element={
          <ProtectRoute>
            <SelectPost />
            </ProtectRoute>
        } />
        <Route path="/NewPost" element={
          <ProtectRoute>
            <NewPost />
            </ProtectRoute>
        } />
        <Route exact path="/UpdatePost" element={
          <ProtectRoute>
            <UpDatePost />
            </ProtectRoute>
        } />
        <Route path="/*" element={
          <p>Non autorisé</p>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

