import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
import { Post } from "../../components/Post/Post";

export function Bookmarks(){

    const {posts, setPosts, bookmarks, setBookmarks, likePost, bookmarkPost, removeBookmark, deletePost} = useContext(PostContext);
    const {user, followList, setFollowList} = useContext(AuthContext);

    const getPosts = async () => {
        try{
            const response = await fetch("/api/users/bookmark",{
                method: "GET",
                headers: {"authorization": localStorage.getItem("encodedToken")}
            });
            const res = await response.json();
            setBookmarks(res.bookmarks);
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

    const handleRemoveBookmarkClick = (postId) => {
        removeBookmark(postId);
    }

    const handleDeletePost = (postId) => {
        deletePost(postId)
    }

    return(
        <div className="main-content">
            <h4 className="text-start">Bookmarks</h4>
            {
                bookmarks.map((post) => {
                    return(
                        <Post key={post._id} data={{post, bookmarks, user, handleLikeClick, handleBookmarkClick, handleDeletePost, handleRemoveBookmarkClick}} />
                    )
                })
            }
        </div>
    )
}