import {createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    return ( 
            <AuthContext.Provider value = {{isLoggedIn,setIsLoggedIn,user,setUser}}> 
                {children} 
            </AuthContext.Provider>)
    }