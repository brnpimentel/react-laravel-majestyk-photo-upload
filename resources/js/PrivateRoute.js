import { hasToken } from "./services/auth";
import { Navigate } from 'react-router-dom';

export default  function PrivateRoute({ children }) {
    
    if(!hasToken()) {
        return <Navigate to="/login" />
    }

    return children;
}