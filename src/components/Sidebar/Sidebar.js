import { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { AuthContext } from "../../context/AuthContext";

export function Sidebar(){

    const {user} = useContext(AuthContext);
    const [users, setUsers] = useState([]); 

    const getUsers = async () => {
        try{
            const response = await fetch("/api/users");
            const res = await response.json();
            console.log(res.users);
            setUsers(res.users.filter((x) => x._id !== user._id));
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    },[])

    return(<div className="sidebar w-100">
            <h4>Who to Follow</h4>
            {users.map((user) => {
                return(<div className="row d-flex align-items-center">
                    <div className="col-md-2"><img className="avatar cursor-pointer" alt={user.username} src={user.profilePic}></img></div>
                    <div className="col-md-6 mt-1 ms-3"><b className="col-md-12">{user.firstName} {user.lastName}</b><p className="col-md-12">@{user.username}</p></div>
                    <div className="col-md-2 d-flex align-items-center"><button className="btn btn-primary btn-follow">Follow</button></div>
                </div>)
            })
            }
        </div>)
}