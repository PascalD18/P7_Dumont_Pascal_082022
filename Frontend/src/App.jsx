import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import AllPosts from './pages/AllPosts/AllPosts'
import NewPost from './pages/NewPost/NewPost'
import UpDatePost from './pages/UpDatePost/UpDatePost'
import DeletePost from './pages/DeletePost/DeletePost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route exact path="/AllPosts" element={
          <PrivateRoute>
            <AllPosts />
          </PrivateRoute>
        } />
        <Route exact path="/NewPost" element={
          <PrivateRoute>
            <NewPost />
          </PrivateRoute>
        } />
        <Route exact path="/UpDatePost" element={
          <PrivateRoute>
            <UpDatePost />
          </PrivateRoute>
        } />
        <Route exact path="/DeletePost" element={
          <PrivateRoute>
            <DeletePost />
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


