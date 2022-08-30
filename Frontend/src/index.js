import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Postes from './pages/Postes'
import Banner from './components/Banner'
import Home from './pages/Home'
import NewPoste from './pages/NewPoste'
import Poste from './pages/Poste'
import ConnectLogin from './components/ConnectLogin'
import ConnectSignup from './components/ConnectSignup'
//import './styles/index.css'

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
				<Switch>
					<Route exact path="/Connexion/login">
						<ConnectLogin />
					</Route>
					<Route exact path="/Postes">
						<Postes />
					</Route>
				</Switch>
				<Switch>
					<Route path="/Connexion/signup">
						<ConnectSignup />
					</Route>
					<Route exact path="/Postes">
						<Postes />
					</Route>
				</Switch>
				<Route exact path="/Poste">
				<Poste />
			</Route>
			</Switch>
			<Route exact path="/NewPoste">
				<NewPoste />
			</Route>

		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)
