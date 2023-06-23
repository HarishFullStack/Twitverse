import dayjs from "dayjs";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { PostContext } from "../../context/PostContext";

export function SinglePost({data}){
    let location = useLocation();
    const navigate = useNavigate();

    const {setPosts} = useContext(PostContext);
    

    const [showEditPostModal, setShowEditPostModal] = useState(false);
    const [editPost, setEditPost] = useState({});
    const [post, setPost] = useState("");

    const handleEditPost = (post) => {
        setPost(post.content);
        setEditPost(post);
        setShowEditPostModal(true);

    }

    const handleClose = () => setShowEditPostModal(false);

    const handleUpdatePost = async() => {
        try{
            const postData = {
                content: post
            }

            const response = await fetch(`/api/posts/edit/${editPost._id}`, {
                method: "POST",
                headers: {"authorization": localStorage.getItem("encodedToken")},
                body: JSON.stringify({postData})
            });
            const res = await response.json();
            console.log(res);
            setPosts(res.posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
            setPost("");
            handleClose();
        } catch(error) {
            console.log(error);
        }
    }

    return(
        
    data.post && <div className={`d-flex mb-5 post-container ${location.pathname.includes("/post") ? "" :  "cursor-pointer"}`}>
        <div className="d-flex">
            <img className="avatar cursor-pointer" alt={data.post.username} src={data.post.profilePic} onClick={() => navigate(`/profile/${data.post.username}`)}></img></div>
        <div className="w-100">
            <b className="username cursor-pointer" onClick={() => navigate(`/profile/${data.post.username}`)}>{data.post.username}</b> | {dayjs(data.post.createdAt).format("MMM")} {dayjs(data.post.createdAt).format("D")}
            <p onClick={() => navigate(`/post/${data.post._id}`)}>{data.post.content}</p>
            <div className="">
                <div className="d-flex">
                    {data.post.likes && <div className="col-md-4"><img className="actions cursor-pointer" src={data.post.likes.likedBy.find((by) => by._id === data.user._id) !== undefined ? require('../../images/heart-red.png') : require('../../images/heart-empty.png')} onClick={() => data.post.likes.likedBy.find((by) => by._id === data.user._id) !== undefined ? data.handleDisLikeClick(data.post._id) : data.handleLikeClick(data.post._id)}></img> {data.post.likes.likeCount}</div>}
                    {data.post.likes && <div className="col-md-4"><img className="actions cursor-pointer" src={data.bookmarks.find((bookmark) => bookmark._id === data.post._id) !== undefined ? require('../../images/bookmark-green.png') : require('../../images/bookmark-black.png') } onClick={() => data.bookmarks.find((bookmark) => bookmark._id === data.post._id) !== undefined ? data.handleRemoveBookmarkClick(data.post._id) : data.handleBookmarkClick(data.post._id)}></img></div>}
                </div>
            </div>
        </div>
        {data.post.username === data.user.username && (location.pathname === "/home" || location.pathname.includes("/post")) && <div className="nav-item dropdown dropstart float-end">
            <i className="fa fa-ellipsis-h float-end cursor-pointer nav-link" data-bs-toggle="dropdown" aria-expanded="false" aria-hidden="true"></i>
            {<ul className="dropdown-menu">
                
                <li><a className="dropdown-item" href="#" onClick={() => handleEditPost(data.post)}>Edit</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => data.handleDeletePost(data.post._id)}>Delete</a></li>
            </ul>}
        </div>}

        <Modal show={showEditPostModal} onHide={handleClose}  size="lg">
            <Modal.Header>
                <Modal.Title>
                    Edit Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex mb-5">
                <div className="d-flex"><img className="avatar cursor-pointer" alt={editPost.username} src={editPost.profilePic} onClick={() => navigate(`/profile/${user.username}`)}></img></div>
                <div className="w-100">
                    <textarea className="post-area w-100" value={post} onChange={(event) => setPost(event.target.value)}/>
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdatePost}>Update</button>
            </Modal.Footer>
        </Modal>
</div>
)
}