import { useNavigate, useParams } from "react-router";
import "./UserProfile.css";
import { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from 'react-bootstrap';
import { Post } from "../../components/Post/Post";
import { PostContext } from "../../context/PostContext";

export function UserProfile(){

    const navigate = useNavigate();
    const {username} = useParams();
    const {user, setUser, allUsers, setAllUsers} = useContext(AuthContext);
    const {bookmarks, setBookmarks, likePost, bookmarkPost, removeBookmark, deletePost} = useContext(PostContext);

    const [posts, setPosts] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState({});
    const [showAvatarModal, setShowAvatarModal] = useState(false);
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
        // profilePic: selectedProfile.profilePic
    })


    const getPosts = async () => {
        try{
            const response = await fetch(`/api/posts/user/${username}/`);
            const res = await response.json();
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

    const handleEditAvatar = () => {
        setShowAvatarModal(true);
    }

    const handleEditAvatarClose = () => {
        setShowAvatarModal(false);
    }

    const handleUpdateProfile = async () => {
        try{
            const response = await fetch(`/api/users/edit`, {
                method: "POST",
                headers: {"authorization": localStorage.getItem("encodedToken")},
                body: JSON.stringify({userData: state})
            });
            const res = await response.json();

            localStorage.setItem("user", JSON.stringify(res.user));
            setUser(res.user);
            if(res.user.username === username){
                console.log(res.user);
                setSelectedProfile(res.user);
            }
            handleClose();
        } catch(error) {
            console.log(error);
        }
    }

    const handleLikeClick = (postId) => {
        likePost(postId);
    }

    const handleBookmarkClick = (postId) => {
        bookmarkPost(postId)
    }

    const handleDeletePost = (postId) => {
        deletePost(postId)
    }

    const handleRemoveBookmarkClick = (postId) => {
        removeBookmark(postId);
    }
    
    const handleAvatarUpdate = (event) => {
        dispatch({type: "PROFILEPIC", value: event.target.src});
        setSelectedProfile({...selectedProfile, profilePic: event.target.src});
        handleEditAvatarClose();
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
                        <div className="col-md-8 profile-info align-items-center">
                            <b className="username cursor-pointer">{selectedProfile.firstName} {selectedProfile.lastName}</b>
                            <p>@{selectedProfile.username}</p>
                        </div>
                        {selectedProfile._id === user._id && <div className="col-md-4 justify-content-end">
                            <button className="btn btn-outline-primary" onClick={() => handleEditProfile()}>Edit Profile</button>
                        </div>}
                    </div>
                    <div className="row col-md-12">
                        <p>{selectedProfile.bio}</p>
                        <a href={selectedProfile.website}>{selectedProfile.website}</a>
                    </div>
                </div>
            </div>
            <hr/>
            {
                posts.map((post) => {
                    return(
                        <Post key={post._id} data={{post, bookmarks, user, handleLikeClick, handleBookmarkClick, handleDeletePost, handleRemoveBookmarkClick}} />      
                    )
                })
            }
            <Modal className="edit-profile-modal" show={showEditProfileModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row pb-4">
                        <div className='col-md-12 d-flex justify-content-center'>
                        <label>
                            <img className="profile-avatar cursor-pointer" alt={selectedProfile.username} src={selectedProfile.profilePic} onClick={handleEditAvatar}></img>
                        </label>
                            {/* <i class="fa fa-camera" aria-hidden="true"></i> */}
                        </div>
                        <div className='row'>
                            <div className="col-md-6">
                                <label htmlFor='firstName'>First Name</label>
                                <input type="text" className="form-control col-md-6"  id="firstName" value={state.firstName} onChange={(event) => dispatch({type: "FIRSTNAME", value: event.target.value})}/>
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

            <Modal className="avatar-modal" show={showAvatarModal}  onHide={handleEditAvatarClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    <img className="profile-avatar cursor-pointer" alt={selectedProfile.username} src="https://res.cloudinary.com/dkkmc7pub/image/upload/v1687433270/Twitverse/profile-pics/download_xa5riv.png" onClick={(event) => handleAvatarUpdate(event)}></img>
                    <img className="profile-avatar cursor-pointer" alt={selectedProfile.username} src="https://res.cloudinary.com/dkkmc7pub/image/upload/v1686553005/Twitverse/profile-pics/man-with-beard-avatar-character-isolated-icon-free-vector_bs1bq0.jpg" onClick={(event) => handleAvatarUpdate(event)}></img>
                    <img className="profile-avatar cursor-pointer" alt={selectedProfile.username} src="https://res.cloudinary.com/dkkmc7pub/image/upload/v1687433270/Twitverse/profile-pics/images_3_jyahqx.jpg" onClick={(event) => handleAvatarUpdate(event)}></img>
                    <img className="profile-avatar cursor-pointer" alt={selectedProfile.username} src="https://res.cloudinary.com/dkkmc7pub/image/upload/v1687433270/Twitverse/profile-pics/download_sy9imr.jpg" onClick={(event) => handleAvatarUpdate(event)}></img>
                    <img className="profile-avatar cursor-pointer" alt={selectedProfile.username} src="https://res.cloudinary.com/dkkmc7pub/image/upload/v1686553005/Twitverse/profile-pics/depositphotos_131750410-stock-illustration-woman-female-avatar-character_fio5tu.webp" onClick={(event) => handleAvatarUpdate(event)}></img>
                    <img className="profile-avatar cursor-pointer" alt={selectedProfile.username} src="https://res.cloudinary.com/dkkmc7pub/image/upload/v1687433270/Twitverse/profile-pics/images_1_lfwcu1.png" onClick={(event) => handleAvatarUpdate(event)}></img>
                </Modal.Body>
            </Modal>
        </div>

    )
}