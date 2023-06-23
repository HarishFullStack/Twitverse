import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { PostContext } from "../../context/PostContext";
import { AuthContext } from "../../context/AuthContext";
import { SinglePost } from "../../components/SinglePost/SinglePost";

export function Bookmarks(){

    const {posts, setPosts, bookmarks, setBookmarks, likePost, disLikePost, bookmarkPost, removeBookmark, deletePost} = useContext(PostContext);
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

    const handleDisLikeClick = (postId) => {
        disLikePost(postId);
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
                        <SinglePost key={post._id} data={{post, bookmarks, user, handleLikeClick, handleDisLikeClick, handleBookmarkClick, handleDeletePost, handleRemoveBookmarkClick}} />
                    )
                })
            }
        </div>
    )
}