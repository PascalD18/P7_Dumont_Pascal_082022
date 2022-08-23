import React from 'react'
//import { Container } from 'reactstrap'
//import FunctionBasedForm from '../pages/FunctionBasedForm'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import EnvoiApi from './EnvoiApi'
//import ReqGet from './ReqGet'


function AppTest (){

    return (
      <div >
          <Router>

            <Route path="/" exact component={EnvoiApi}></Route>
          </Router>
          
         

      </div>
    )
  }


export default AppTest