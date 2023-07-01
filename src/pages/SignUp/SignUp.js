import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignUp() {

    const navigate = useNavigate();

    const {setIsLoggedIn, setUser} = useContext(AuthContext);
    const {setBookmarks} = useContext(PostContext);

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    const handleSignUpClick = async () =>{
            try{
            const creds = {username, password, firstName, lastName, profilePic: "https://res.cloudinary.com/dkkmc7pub/image/upload/v1687450387/Twitverse/profile-pics/default-profile_dlg4eu.png"};

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(creds)
            });

            const res = await response.json();
            if(res.errors)
            {
                toast.error(res.errors[0], {position: toast.POSITION.BOTTOM_RIGHT});
            }else{
                toast.success("Account created", {position: toast.POSITION.BOTTOM_RIGHT});
                localStorage.setItem("encodedToken", res.encodedToken);
                localStorage.setItem("user", JSON.stringify(res.createdUser));
                setIsLoggedIn(true);
                setUser(res.createdUser);
                setBookmarks(res.createdUser.bookmarks);
                navigate("/home");
            }
        }catch(error){
            console.log(error);
        }
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