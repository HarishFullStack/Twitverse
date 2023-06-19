import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Login } from "../../pages/Login/Login";
import { Navigate } from "react-router";

export function RequiresAuth({children}){
    const {isLoggedIn} = useContext(AuthContext);

    return isLoggedIn ? children : <Navigate to="/"/>;
}