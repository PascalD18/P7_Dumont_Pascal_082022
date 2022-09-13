import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import BannerLogin from './BannerLogin'
import '../../styles/index.css'
import './Login.css'

function Login() {
  const navigate = useNavigate()


  localStorage.clear('token')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()

    const baseUrlBack = sessionStorage.getItem("baseUrlBack");
    const baseUrl = `${baseUrlBack}auth/login`

    const obj = {
      email: email,
      password: password
    }
    axios({
      method: 'post',
      url: baseUrl,
      data: obj
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.userId)

        const authHeader = { Authorization: `Bearer ${res.data.token}` };
        localStorage.setItem('authHeader', JSON.stringify(authHeader))

        if (res.request.status === 200) {
          localStorage.setItem('authNav', 'Nav Ok')
          alert("Utilisateur logé")
        }
        navigate('/AllPosts')
      })
      .catch((err) => { alert(err) })

  }
  return (
      <div>
        <div><BannerLogin /></div>
        <div className="L_Sect">
          <div className="L_GrpData">
            <label className="Label_Data" htmlFor="saisieEmail" >Email</label>
            <input className="Text_Input"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={event => { setEmail(event.target.value) }} />
          </div>
          <div className="L_GrpData">
            <label className="Label_Data" htmlFor="saisiePassword">Password</label>
            <input className="Text_Input"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="L_GrpBtn">
            <button className="Btn_Listening" onClick={handleSubmit}>Valider</button>
          </div>
        </div>
      </div>
  );
}
export default Login