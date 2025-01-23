import { Navigate } from 'react-router-dom'
import {useAuth} from "../context/AuthProvider";

interface PrivateRouteProps {
    children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default PrivateRoute