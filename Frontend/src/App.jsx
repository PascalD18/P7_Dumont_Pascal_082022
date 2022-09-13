import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import AllPosts from './pages/AllPosts/AllPosts'
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
sessionStorage.setItem('baseHeader', JSON.stringify(baseHeader))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AllPosts" element={
          <PrivateRoute>
            <AllPosts />
          </PrivateRoute>
        } />
        <Route path="/NewPost" element={
          <PrivateRoute>
            <NewPost />
          </PrivateRoute>
        } />
        <Route exact path="/UpdatePost" element={
          <PrivateRoute>
            <UpDatePost />
          </PrivateRoute>
        } />
        <Route path="/*" element={
          <p>Non autorisé</p>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App


