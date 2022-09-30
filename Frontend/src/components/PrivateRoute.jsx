import { Navigate } from 'react-router-dom'
const PrivateRoute = ({ children }) => {
  const authNav=sessionStorage.getItem('authNav')
  if (authNav !== 'OK') {
    alert("Merci de vous reconnecter.")
    return <Navigate to="/" />
  }
  return children;
};

export default PrivateRoute