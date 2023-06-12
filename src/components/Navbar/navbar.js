import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

export function Navbar(){

    const navigate = useNavigate();

    const getActiveStyle = ({isActive}) => ({
        fontWeight: isActive ? "600" : "400" 
    })

    const handleLogOut = () => {
        localStorage.removeItem("encodedToken");
        localStorage.removeItem("user");
        navigate("/");
    }

    return(
        <ul className="nav flex-column">
            <li className="nav-item">
                <div className="navlink">
                    <NavLink className="nav-link" style={getActiveStyle} to="/home"><i className="fa fa-home"></i> Home</NavLink>
                </div>
            </li>
            <li className="nav-item">
                <div className="navlink">
                    <NavLink className="nav-link" style={getActiveStyle}  to="/explore"><i className="fa fa-search" aria-hidden="true"></i> Explore</NavLink>
                </div>
            </li>
            <li className="nav-item">
                <div className="navlink">
                    <NavLink className="nav-link" style={getActiveStyle}  to="/bookmarks"><i className="fa fa-bookmark" aria-hidden="true"></i> Bookmarks</NavLink>
                </div>
            </li>
            <li className="nav-item">
                <div className="navlink">
                    <a href="#" className="nav-link" onClick={handleLogOut}><i class="fa fa-outdent" aria-hidden="true"></i> Logout</a>
                </div>
            </li>
        </ul>
    )
}