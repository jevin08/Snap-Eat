import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const ProtectedRoute = () => {
    const {isLoggedIn} = useUserContext(); 
    // determine if authorized, from context or however you're doing it
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;