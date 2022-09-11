import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({children }) => {
     const token = localStorage.getItem('token')
    if (token == null) {
     alert("Merci de vous reconnecter.")
     // return <Navigate to="/" replace />
      return <Navigate to="/" />
     
    }
    return children;
  };

  export default ProtectedRoute