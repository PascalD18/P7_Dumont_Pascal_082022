import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//import Postes from './pages/Postes'
import Postes from './pages/Postes'
//import ConnectForm from './components/ConnectForm'
//import NewPoste from './pages/NewPoste'
//import './styles/index.css'
//import App from './components/App'
import Banner from './components/Banner'
import ConnectForm from './components/ConnectForm'
import Home from './pages/Home'
import NewPoste from './pages/NewPoste'

const baseUrlBack = 'http://localhost:3001/api'
sessionStorage.setItem("baseUrlBack", baseUrlBack)
const baseUrlFront = 'http://localhost:3000'
sessionStorage.setItem("baseUrlFront", baseUrlFront)

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Banner />
			<Home />
			<Switch>
				<Route exact path="/Connexion/:connectType">
					<ConnectForm />
				</Route>
				<Route exact path="/Postes">
					<Postes />
				</Route>
				<Route path = "/NewPoste">
					<NewPoste/>
				</Route>
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
