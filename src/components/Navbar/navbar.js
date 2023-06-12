import { NavLink } from "react-router-dom";
import "./navbar.css";

export function Navbar(){

    const getActiveStyle = ({isActive}) => ({
        fontWeight: isActive ? "600" : "400" 
    })

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
        </ul>
    )
}