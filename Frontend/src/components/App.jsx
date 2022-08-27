import React from 'react'
//import { BrowserRouter as Router} from 'react-router-dom'
//import Postes from '../pages/Postes'
//import Home from '../pages/Home'
//import ConnectForm from './ConnectForm'
//import NewPoste from '../pages/NewPoste'

import Banner from './Banner'

const baseUrlBack = 'http://localhost:3001/api/'
sessionStorage.setItem("baseUrlBack", baseUrlBack)
const baseUrlFront = 'http://localhost:3000'
sessionStorage.setItem("baseUrlFront", baseUrlFront)

function App() {

  
    <Banner />


}

//<Router>
//<Banner />
//<Route exact path="/Connexion/login">
//  <Home />
//</Route>
//<Switch>
//  <Route path="/Connexion/:connectType">
//    <ConnectForm />
//  </Route>
//  <Route path="/Postes">
//    <Postes />
//  </Route>
//  <Route path="/NewPoste">
//    <NewPoste />
//  </Route>
//</Switch>
//</Router>

export default App