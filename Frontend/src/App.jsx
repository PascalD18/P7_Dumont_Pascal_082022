import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home/Home'
import FormConnect from './pages/FormConnect/FormConnect'
import AllPosts from './pages/AllPosts/AllPosts'
import FormNewUpDate from './pages/FormNewUpDate/FormNewUpDate'
import DeletePost from './pages/DeletePost/DeletePost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/FormConnect" element={<FormConnect />} />
        <Route exact path="/AllPosts" element={
          <PrivateRoute>
            <AllPosts />
          </PrivateRoute>
        } />
        <Route exact path="/FormNewUpDate" element={
          <PrivateRoute>
            <FormNewUpDate />
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