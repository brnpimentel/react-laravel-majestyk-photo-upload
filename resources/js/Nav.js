import { hasToken, logout } from "./services/auth";
import { Link, useNavigate } from "react-router-dom";


export default function Nav() {
    let navigate = useNavigate();

    return (<nav className="space-x-4">            
        { hasToken()
            ?   <button type="button" onClick={() => {
                    logout(); 
                    navigate('/login', {replace: true})
                }}>Logout</button>
            :   <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                </>
        }
    </nav>)
}