import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export function SignUp() {

    const navigate = useNavigate();

    const {setIsLoggedIn, setUser} = useContext(AuthContext);

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    const handleSignUpClick = async () =>{
        const creds = {username, password, firstName, lastName};

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(creds)
        });

        const res = await response.json();
        console.log(res);
        localStorage.setItem("encodedToken", res.encodedToken);
        localStorage.setItem("user", JSON.stringify(res.createdUser));

        setIsLoggedIn(true);
        setUser(res.createdUser);
        navigate("/home");
    }

    return (
        <div className="signup-container">
            <div className="card signup-card">
                <div className="card-body">
                    <div className="sign-up-header"><h3 className="font-bold">Sign Up</h3></div>
                    <div className="input-container p-2">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control text-input"  id="firstname" onChange={(event) => setFirstname(event.target.value)}/>
                    </div>
                    <div className="input-container p-2">
                        <label htmlFor="lasttname">Last Name</label>
                        <input type="text" className="form-control text-input"  id="lasttname" onChange={(event) => setLastname(event.target.value)}/>
                    </div>
                    <div className="input-container p-2">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control text-input"  id="username" onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="input-container p-2">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <input type={passwordType} className="form-control text-input" id="password" onChange={(event) => setPassword(event.target.value)}/>
                            <span className="input-group-text cursor-pointer" onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")}>{passwordType==="password"? <i className="fa fa-eye-slash"></i> :<i className="fa fa-eye"></i>}</span> 
                        </div>
                    </div>
                    <div className="input-container p-2">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" className="form-control text-input" id="confirm-password" onChange={(event) => setConfirmPassword(event.target.value)}/>
                    </div>
                    <div className="input-container p-2">
                        <button className="btn btn-primary" disabled={ firstName ==="" || lastName ==="" || username === "" || password === "" || confirmPassword === "" || password !== confirmPassword } onClick={handleSignUpClick}>Create New Account</button>
                    </div>
                    <div className="p-2">
                        Already have an account? <NavLink to="/login">sign in</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}