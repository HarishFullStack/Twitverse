import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "./Home.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/AuthContext";

export function Home(){

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);
    const {user} = useContext(AuthContext);
    const [bookmarks, setBookmarks] = useState(user.bookmarks);
    const [file, setFile] = useState();

    const getPosts = async () => {
        try{
            const response = await fetch("/api/posts");
            const res = await response.json();
            setPosts(res.posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
            //setIsLoading(false);
        } catch(error) {
            console.log(error);
            //setIsLoading(false);
        }
    }

    useEffect(() => {
        //setIsLoading(true);
        getPosts();
    },[])

    const handleLikeClick = async (postId) => {
        try{
            const response = await fetch(`/api/posts/like/${postId}`, {
                method: "POST",
                headers: {"authorization": localStorage.getItem("encodedToken")}
            });
            const res = await response.json();
            setPosts(res.posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch(error) {
            console.log(error);
        }
    }

    const handleBookmarkClick = async (postId) => {
        try{
            const response = await fetch(`/api/users/bookmark/${postId}/`, {
                method: "POST",
                headers: {"authorization": localStorage.getItem("encodedToken")}
            });
            const res = await response.json();

            if(res){
                const response1 = await fetch(`/api/users/${user._id}`, {
                    method: "GET",
                    headers: {"authorization": localStorage.getItem("encodedToken")}
                });
                const res1 = await response1.json();
                setBookmarks(res1.user.bookmarks);
                localStorage.setItem("user", JSON.stringify(res1.user));
            }
        } catch(error) {
            console.log(error);
        }
    }

    const handleFileUpload = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleRemoveFile = (e) => {
        setFile();
    }

    const handleCreatePost = async () => {
        try{
            const postData = {
                content: post, 
                profilePic: user.profilePic
            }

            const response = await fetch(`/api/posts`, {
                method: "POST",
                headers: {"authorization": localStorage.getItem("encodedToken")},
                body: JSON.stringify({postData})
            });
            const res = await response.json();
            setPosts(res.posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch(error) {
            console.log(error);
        }
    }

    const handleDeletePost = async (postId) => {
        try{
            const response = await fetch(`/api/posts/${postId}`, {
                method: "DELETE",
                headers: {"authorization": localStorage.getItem("encodedToken")}
            });
            const res = await response.json();
            setPosts(posts.filter((x) => x._id !== postId).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <div className="main-content">
            <h4 className="text-start">Home</h4>
            <div className="d-flex mb-5">
                <div className="d-flex"><img className="avatar cursor-pointer" alt={user.username} src={user.profilePic}></img></div>
                <div className="w-100">
                    <textarea className="post-area w-100" rows={5} cols={20} placeholder={`What's on your mind, ${user.firstName}`} onChange={(event) => setPost(event.target.value)}/>
                    <hr></hr>
                    {file && <div className="position-relative"><img className="w-100" src={file}></img> <button className="button-remove" onClick={handleRemoveFile}><i className="fa fa-times" aria-hidden="true"></i></button></div>}
                    <div className="w-100">
                        <label>
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload}/>
                                <img src="./assets/images/image-upload.png"></img>
                            </label>
                        <button className="btn btn-primary btn-post d-flex float-end" onClick={handleCreatePost}>Post</button>
                    </div>
                    <hr></hr>

                </div>
                
            </div>
            {
                posts.map((post) => {
                    return(
                        <div className="d-flex mb-5" key={post._id}>
                            <div className="d-flex"><img className="avatar cursor-pointer" alt={post.username} src={post.profilePic}></img></div>
                            <div className="w-100">
                                <b className="username cursor-pointer">{post.username}</b> | {dayjs(post.createdAt).format("MMM")} {dayjs(post.createdAt).format("D")}
                                <p>{post.content}</p>
                                <div className="">
                                    <p>{console.log(user.bookmarks.find((bookmark) => bookmark._id === post._id) !== undefined)}</p>
                                    <div className="d-flex">
                                        <div className="col-md-4"><img className="actions cursor-pointer" src={post.likes.likedBy.find((by) => by._id === user._id) !== undefined ? "./assets/images/heart-red.png" : "./assets/images/heart-empty.png"} onClick={() => handleLikeClick(post._id)}></img> {post.likes.likeCount}</div>
                                        <div className="col-md-4"><img className="actions cursor-pointer" src={bookmarks.find((bookmark) => bookmark._id === post._id) !== undefined ? "./assets/images/bookmark-green.png" : "./assets/images/bookmark-black.png"} onClick={() => handleBookmarkClick(post._id)}></img></div>
                                    </div>
                                </div>
                            </div>
                            {post.username === user.username && <div className="nav-item dropdown dropstart float-end">
                                <i className="fa fa-ellipsis-h float-end cursor-pointer nav-link" data-bs-toggle="dropdown" aria-expanded="false" aria-hidden="true"></i>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Edit</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleDeletePost(post._id)}>Delete</a></li>
                                </ul>
                            </div>}
                        </div>
                    )
                })
            }
        </div>
    )
}