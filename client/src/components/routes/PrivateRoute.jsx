import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext);
    // console.log(isAuthenticated);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
