import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./Home.css";

export function Home(){

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [bookmarks, setBookmarks] = useState(user.bookmarks);

    const getPosts = async () => {
        try{
            const response = await fetch("/api/posts");
            const res = await response.json();
            setPosts(res.posts);
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
            setPosts(res.posts);
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

    return(
        <>
            <h4 className="text-start">Home</h4>
            {
                posts.map((post) => {
                    return(
                        <div className="d-flex mb-5" key={post._id}>
                            <div className="d-flex"><img className="avatar cursor-pointer" alt={post.username} src={post.profilePic}></img></div>
                            <div>
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
                            <div className="nav-item dropdown dropstart">
                                <i className="fa fa-ellipsis-h float-end cursor-pointer nav-link" data-bs-toggle="dropdown" aria-expanded="false" aria-hidden="true"></i>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Edit</a></li>
                                    <li><a className="dropdown-item" href="#">Delete</a></li>
                                </ul>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}