import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import AllPosts from './pages/AllPosts/AllPosts'
import SelectPost from './pages/SelectPost/SelectPost'
import NewPost from './pages/NewPost/NewPost'
//import SendNewPost from './pages/NewPost/SendNewPost'
import UpDatePost from './pages/UpDatePost/UpDatePost'
import AuthNav from './componentsTest1/AuthNav'
//import Redirection from './pages//AllPosts/Redirection'



//Initialisation des Url de bases
const baseUrlBack = 'http://localhost:3001/api/'
sessionStorage.setItem("baseUrlBack", baseUrlBack)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AllPosts" element={
          <>
            <AuthNav />,
            <AllPosts />
          </>
        } />
        <Route path="/SelectPost" element={
          <>
            <AuthNav />,
            <SelectPost />
          </>
        } />
        <Route path="/NewPost" element={
          <>
            <AuthNav />,
            <NewPost />
          </>
        } />
        <Route exact path="/UpdatePost" element={
          <>
            <AuthNav />,
            <UpDatePost />
          </>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

