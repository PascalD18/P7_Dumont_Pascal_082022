import { useNavigate } from 'react-router-dom'
//import { useEffect } from 'react'

function AuthNav() {
  const navigate = useNavigate()
  return (
    <div>
      {(localStorage.getItem('token') === null) ?
        (localStorage.setItem('authNav', false),

          navigate('/')

        ) : (
          localStorage.setItem('authNav', true) )   
        }  

    </div>
  )
}
export default AuthNav