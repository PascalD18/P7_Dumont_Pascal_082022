import { Navigate } from 'react-router-dom'
import { useGlobalState } from './StateGlobal'
const PrivateRoute = ({ children }) => {
  const authNav=sessionStorage.getItem('authNav')
  if (authNav=== 'Ok') {
    alert("Merci de vous reconnecter.")
    return <Navigate to="/" />
  }
  return children;
};

export default PrivateRoute