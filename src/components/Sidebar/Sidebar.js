import { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Sidebar(){

    const {user, setUser, allUsers, setAllUsers} = useContext(AuthContext);
    const [followList, setFollowList] = useState([]);

    const [followingList, setFollowingList] = useState([]);

    const getUsers = async () => {
        try{
            const response = await fetch("/api/users");
            const res = await response.json();
            setFollowingList(user.following.map(x => x._id));
            setAllUsers(res.users);
            setFollowList(res.users.filter((x) => x._id !== user._id));
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    },[])


    const handleFollowClick = async (followUserId) => {
        try{
            const response = await fetch(`/api/users/follow/${followUserId}/`,{
                method: "POST",
                headers: {"authorization": localStorage.getItem("encodedToken")}
            });
            const res = await response.json();
            if(res.errors){
                toast.error(res.errors[0], {position: toast.POSITION.BOTTOM_RIGHT});
            }else{
                localStorage.setItem("user", JSON.stringify(res.user));
                setUser(res.user);
                setFollowingList(res.user.following.map(x => x._id));
                setFollowList(followList.filter((x) => x._id !== user._id));
            }
        } catch(error) {
            console.log(error);
        }
    }

    const handleUnFollowClick = async (followUserId) => {
        try{
            const response = await fetch(`/api/users/unfollow/${followUserId}/`,{
                method: "POST",
                headers: {"authorization": localStorage.getItem("encodedToken")}
            });
            const res = await response.json();
            if(res.errors){
                toast.error(res.errors[0], {position: toast.POSITION.BOTTOM_RIGHT});
            }else{
                localStorage.setItem("user", JSON.stringify(res.user));
                setUser(res.user);
                setFollowingList(res.user.following.map(x => x._id));
                setFollowList(followList.filter((x) => x._id !== user._id));
            }
        } catch(error) {
            console.log(error);
        }
    }

    return(<div className="sidebar w-100 sticky-top">
            <h4>Who to Follow</h4>
            {followList.map((follow) => {
                    return(
                    <div className="row d-flex align-items-center" key={follow._id}>
                        <div className="col-md-2"><img className="avatar cursor-pointer" alt={follow.username} src={follow.profilePic}></img></div>
                        <div className="col-md-6 mt-1 ms-3"><b className="col-md-12">{follow.firstName} {follow.lastName}</b><p className="col-md-12">@{follow.username}</p></div>
                        <div className="col-md-2 d-flex align-items-center"><button className="btn btn-primary btn-follow" onClick={() => followingList.includes(follow._id) ? handleUnFollowClick(follow._id) : handleFollowClick(follow._id)}>{ followingList.includes(follow._id) ? "UnFollow" : "Follow"}</button></div>
                    </div>)
                })
            }
        </div>)
}