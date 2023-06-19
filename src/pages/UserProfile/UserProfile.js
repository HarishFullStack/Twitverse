import { useNavigate, useParams } from "react-router";
import "./UserProfile.css";
import { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from 'react-bootstrap';

export function UserProfile(){

    const navigate = useNavigate();
    const {username} = useParams();
    const {user, setUser, allUsers, setAllUsers} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState({});
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);


const reducer = (state, action) => {
    switch(action.type){
        case "FIRSTNAME":
            return {...state, firstName: action.value}

        case "LASTNAME":
            return {...state, lastName: action.value}

        case "BIO":
            return {...state, bio: action.value}

        case "WEBSITE":
            return {...state, website: action.value}

        case "PROFILEPIC":
            return {...state, profilePic: action.value}

        default:

        return state;
    }
}

    const [state, dispatch] = useReducer(reducer, {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        website: user.website,
        profilePic: ""
    })


    const getPosts = async () => {
        try{
            const response = await fetch(`/api/posts/user/${username}/`);
            const res = await response.json();
            console.log(res);
            console.log(allUsers);
            if(res.errors){
                toast.error(res.errors[0], {position: toast.POSITION.BOTTOM_RIGHT});
            }else{
                setPosts(res.posts);
                setSelectedProfile(allUsers.find((x) => x.username === username));
            }
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPosts();
     }, [])

    const handleClose = () => setShowEditProfileModal(false);

    const handleEditProfile = () => {
        setShowEditProfileModal(true);
    }

    const handleUpdateProfile = async () => {
        console.log(state);
        try{
            const response = await fetch(`/api/users/edit`, {
                method: "POST",
                headers: {"authorization": localStorage.getItem("encodedToken")},
                body: JSON.stringify({userData: state})
            });
            const res = await response.json();
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res.user));
            setUser(res.user);
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <div className="main-content">
            <div className="row">
                <div className="d-flex align-items-center fit-content back-button" onClick={() => navigate("/home")}><i className="fa fa-arrow-left" aria-hidden="true"></i></div>
                <div className="fit-content"><h4 className="text-start">Home</h4></div>
            </div>
            <div className="row col-md-12">
                <div className="col-md-2 fit-content">
                    <img className="profile-avatar cursor-pointer" alt={selectedProfile.username} src={selectedProfile.profilePic}></img>
                </div>
                <div className="col-md-10 align-items-center">
                    <div className="row col-md-12">
                        <div className="col-md-10 profile-info align-items-center">
                            <b className="username cursor-pointer">{selectedProfile.firstName} {selectedProfile.lastName}</b>
                            <p>@{selectedProfile.username}</p>
                        </div>
                        <div className="col-md-2 justify-content-end">
                            <button className="btn btn-outline-primary" onClick={() => handleEditProfile()}>Edit Profile</button>
                        </div>
                    </div>
                    <div className="row col-md-12">
                        <p>{selectedProfile.bio}</p>
                        <a href={selectedProfile.website}>{selectedProfile.website}</a>
                    </div>
                </div>
            </div>
            <hr/>
            <Modal show={showEditProfileModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row pb-4">
                        <div className='row'>
                            <div className="col-md-6">
                                <label htmlFor='firstName'>First Name</label>
                                <input type="text" className="form-control col-md-6"  id="firstName" value={state.firstName} onChange={(event) => dispatch({type: "FIRSTNAME", value: event.target.value})}/>
                                {state.firstName}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor='lastName'>Last Name</label>
                                <input type="text" className="form-control col-md-6"  id="lastName" value={state.lastName} onChange={(event) => dispatch({type: "LASTNAME", value: event.target.value})}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-12">
                                <label htmlFor='bio'>Bio</label>
                                <input type="text" className="form-control col-md-6"  id="bio" value={state.bio} onChange={(event) => dispatch({type: "BIO", value: event.target.value})}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-12">
                                <label htmlFor='website'>Website</label>
                                <input type="text" className="form-control col-md-6"  id="website" value={state.website}  onChange={(event) => dispatch({type: "WEBSITE", value: event.target.value})}/>
                            </div>
                        </div>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}>Update</button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}