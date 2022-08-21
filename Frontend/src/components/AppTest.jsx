import React, { Component } from 'react'
//import { Container } from 'reactstrap'
import FunctionBasedForm from '../pages/FunctionBasedForm'
import ReqGet from './ReqGet'


class AppTest extends Component {
  render() {
    return (
      <div >
          <FunctionBasedForm/>
          <ReqGet/>
         

      </div>
    )
  }
}

export default AppTest