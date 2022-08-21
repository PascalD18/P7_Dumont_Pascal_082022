import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import Banner from './components/Banner'
//import Test from './pages/Test'
import Saisie from './components/Saisie'

ReactDOM.render(
	<React.StrictMode>
		<Banner />
		<Saisie/>

	</React.StrictMode>,
	document.getElementById('root')
)

//const root = ReactDOM.createRoot(
//		document.getElementById("root")
//	  );
//	  root.render(<App />);
