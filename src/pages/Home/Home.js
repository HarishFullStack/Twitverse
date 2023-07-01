import { useContext, useEffect, useReducer, useState } from "react";
import dayjs from "dayjs";
import "./Home.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { PostContext } from "../../context/PostContext";
import { Post, SinglePost } from "../../components/SinglePost/SinglePost";
import { Modal } from "react-bootstrap";

export function Home(){

    const navigate = useNavigate();

    const {user, followList, setFollowList} = useContext(AuthContext);
    const {posts, setPosts, bookmarks, setBookmarks, likePost, disLikePost, bookmarkPost, removeBookmark, deletePost} = useContext(PostContext);

    const [post, setPost] = useState("");
    const [file, setFile] = useState();


    const getPosts = async () => {
        try{
            const response = await fetch("/api/posts");
            const res = await response.json();
            let following = user.following.map((x) => x.username);
            following = [...following, user.username];
            console.log(res)
            setPosts(res.posts);
            //setIsLoading(false);
        } catch(error) {
            console.log(error);
            //setIsLoading(false);
        }
    }

    const reducer = (state, action) => {
        switch(action.type){
            case "trending":
                return {...state, filter: "Trending Posts", filteredPosts: posts.sort((a, b) => b.likes.likeCount - a.likes.likeCount)}
            case "latest":
                return {...state, filter: "Latest Posts", filteredPosts: posts.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)) }
            case "oldest":
                return {...state, filter: "Oldest Posts", filteredPosts: posts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))  }
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        filter: "Trending Posts",
        filteredPosts: posts.sort((a, b) => b.likes.likeCount - a.likes.likeCount)
    }); 

    useEffect(() => {
        //setIsLoading(true);
        getPosts();
    },[])

    const handleLikeClick = (postId) => {
        likePost(postId);
    }

    const handleDisLikeClick = (postId) => {
        disLikePost(postId);
    }

    const handleBookmarkClick = (postId) => {
        bookmarkPost(postId)
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
                profilePic: user.profilePic,
                userId: user._id
            }

            const response = await fetch(`/api/posts`, {
                method: "POST",
                headers: {"authorization": localStorage.getItem("encodedToken")},
                body: JSON.stringify({postData})
            });
            const res = await response.json();
            setPosts(res.posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
            setPost("");
        } catch(error) {
            console.log(error);
        }
    }

    const handleDeletePost = (postId) => {
        deletePost(postId)
    }

    const handleRemoveBookmarkClick = (postId) => {
        removeBookmark(postId);
    }

    return(
        <div className="">
            <h4 className="text-start p1-rem">Home</h4>
            <div className="d-flex mb-5 p1-rem">
                <div className="d-flex"><img className="avatar cursor-pointer" alt={user.username} src={user.profilePic} onClick={() => navigate(`/profile/${user.username}`)}></img></div>
                <div className="w-100">
                    <textarea className="post-area w-100" rows={5} cols={20} placeholder={`What's on your mind, ${user.firstName}`} value={post} onChange={(event) => setPost(event.target.value)}/>
                    <hr></hr>
                    {file && <div className="position-relative"><img className="w-100" src={file}></img> <button className="button-remove" onClick={handleRemoveFile}><i className="fa fa-times" aria-hidden="true"></i></button></div>}
                    <div className="w-100">
                        <label>
                            {/* <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload}/>
                                <img src="./assets/images/image-upload.png"></img> */}
                        </label>
                        <button className="btn btn-primary btn-post d-flex float-end" disabled={post === ""} onClick={handleCreatePost}>Post</button>
                    </div>

                </div>
                
            </div>
            <div className="row post-filter">
                <div className="col-md-9"><h5 >{state.filter}</h5></div>
                <div className="col-md-3 nav-item dropdown dropstart d-flex justify-content-end"> <i className=" fa fa-filter d-flex align-content-end cursor-pointer" data-bs-toggle="dropdown" aria-hidden="true"></i>
                    {<ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={() => dispatch({type: "trending" })}>Trending</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => dispatch({type: "latest" })}>Latest</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => dispatch({type: "oldest" })}>Oldest</a></li>
                    </ul>}
                </div>
            </div>

            <div className="main-content">
                {
                    state.filteredPosts.map((post) => {
                        return(
                            <SinglePost key={post._id} data={{post, bookmarks, user, handleLikeClick, handleDisLikeClick, handleBookmarkClick, handleDeletePost, handleRemoveBookmarkClick}} />
                        )
                    })
                }
            </div>
            </div>
    )
}