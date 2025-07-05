import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import Spinner from "./Spinner.jsx";

const ProtectedRoute = ({children, requiredRole = null}) => {
    const {user, loading} = useAuth();

    if (loading) {


        return <Spinner/>;
    }

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (requiredRole && user.role !== requiredRole) {

        return <Navigate to="/admin/dashboard" replace/>;
    }

    return children;
};

export default ProtectedRoute;