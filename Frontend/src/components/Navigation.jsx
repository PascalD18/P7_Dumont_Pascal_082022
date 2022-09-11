import { Link } from 'react-router-dom'
const Navigation = () => (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/Login">Login</Link>
        {/* <Link to="/dashboard">Dashboard</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/admin">Admin</Link>*/}
    </nav>
)
export default Navigation