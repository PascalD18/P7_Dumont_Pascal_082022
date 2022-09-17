import { Navigate } from 'react-router-dom'
const PrivateRoute = ({ children }) => {
  const headers = sessionStorage.getItem('authHeader')
  if (headers == null) {
    alert("Merci de vous reconnecter.")
    // return <Navigate to="/" replace />
    return <Navigate to="/" />
  }
  return children;
};

export default PrivateRoute