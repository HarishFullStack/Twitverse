import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostContext } from "../../context/PostContext";

export function Login(){

    const navigate = useNavigate();
    const {setIsLoggedIn, setUser} = useContext(AuthContext);
    const {setBookmarks} = useContext(PostContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (username, password) => {
        try{
            const creds = {username, password};
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(creds)
            });
            const res = await response.json();
            if(res.errors){
                toast.error(res.errors[0], {position: toast.POSITION.BOTTOM_RIGHT});
            }else{
                localStorage.setItem("encodedToken", res.encodedToken);
                localStorage.setItem("user", JSON.stringify(res.foundUser));

                setIsLoggedIn(true);
                setUser(res.foundUser);
                setBookmarks(res.foundUser.bookmarks);

                navigate("/home");
            }
        }
        catch(error){
        }
    }

    return (
        <div className="login-container">
            <div className="card login-card">
                <div className="card-body">
                    <div className="sign-in-header"><h3 className="font-bold">Sign In</h3></div>
                    <div className="input-container p-2">
                        <label htmlFor="email">Username</label>
                        <input type="text" className="form-control text-input"  id="username" onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="input-container p-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control text-input" id="password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div className="input-container p-2">
                        <button className="btn btn-primary" disabled={username === "" || password === "" } onClick={() => handleLogin(username, password)}>Login</button>
                        <button className="btn btn-primary btn-login-guest" onClick={() => handleLogin("harishgupta", "harishgupta123")}>Login as Guest</button>
                    </div>
                    <div className="p-2">
                        <label>Don't have an account?</label> <NavLink to="/signup">sign up</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}