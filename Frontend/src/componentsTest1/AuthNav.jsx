import {Link } from 'react-router-dom'
function AuthNav() {
  const token = localStorage.getItem('token')
  return (
    <div>
      {(token === null) ? (
        localStorage.setItem('authNav', 'false'),
        <div>
        <Link to='/'/>
        </div>
      ):(
        localStorage.setItem('authNav', 'true')
      )}
    </div>
  )
}
export default AuthNav