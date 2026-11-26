// Outlet let's us divide pages into groups:
// 1. Group are pages that are accessible without authorization (/login, /register)
// 2. All other pages will require authentication
import {Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute() {
    const {isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p> Loading...</p>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet />;
}

export default ProtectedRoute;