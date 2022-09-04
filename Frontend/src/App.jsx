import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ConnectLogin from './components/Login'
import ConnectSignup from './components/Signup'
import AllPosts from './pages/AllPosts'
import SelectPost from './pages/SelectPost'
import NewPost from './pages/NewPost'
import DeletePost from './components/DeletePost'

//Initialisation des Url de bases
const baseUrlBack = 'http://localhost:3001/api/'
sessionStorage.setItem("baseUrlBack", baseUrlBack)

function App() {
  return(
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route exact path="/Login" element={<ConnectLogin/>}/>
    <Route path="/Signup" element={<ConnectSignup/>}/>
    <Route path="/AllPosts" element={<AllPosts/>}/>
    <Route path="/SelectPost" element={<SelectPost/>}/>
    <Route path="/NewPost" element={<NewPost/>}/>
    <Route path="/DeletePost" element={<DeletePost/>}/>
    
    

    </Routes>
    </BrowserRouter>
    )

  
  }

  export default App

