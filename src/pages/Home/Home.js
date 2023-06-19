import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "./Home.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { PostContext } from "../../context/PostContext";
import { Post } from "../../components/Post/Post";

export function Home(){

    const {user, followList, setFollowList} = useContext(AuthContext);
    const {posts, setPosts, bookmarks, setBookmarks, likePost, bookmarkPost, removeBookmark, deletePost} = useContext(PostContext);

    const [post, setPost] = useState([]);
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

    const handleLikeClick = (postId) => {
        likePost(postId);
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
                        <Post data={{post, bookmarks, user, handleLikeClick, handleBookmarkClick, handleDeletePost, handleRemoveBookmarkClick}} />
                    )
                })
            }
        </div>
    )
}