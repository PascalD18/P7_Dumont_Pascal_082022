import { Navigate } from 'react-router-dom'
import { useGlobalState } from './StateGlobal'
const PrivateRoute = ({ children }) => {
  //const header = sessionStorage.getItem('authHeader')
  const authHeader=useGlobalState('authHeader')
  if (authHeader[0] === '_') {
    alert("Merci de vous reconnecter.")
    return <Navigate to="/" />
  }
  return children;
};

export default PrivateRoute