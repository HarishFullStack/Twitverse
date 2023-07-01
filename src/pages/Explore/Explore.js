import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";
import { SinglePost } from "../../components/SinglePost/SinglePost";

export function Explore(){
    const {user, followList, setFollowList} = useContext(AuthContext);
    const {posts, setPosts, bookmarks, setBookmarks, likePost, disLikePost, bookmarkPost, removeBookmark, deletePost} = useContext(PostContext);

    const [post, setPost] = useState("");

    const getPosts = async () => {
        try{
            const response = await fetch("/api/posts");
            const res = await response.json();
            setPosts(res.posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
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

    const handleDeletePost = (postId) => {
        deletePost(postId)
    }

    const handleRemoveBookmarkClick = (postId) => {
        removeBookmark(postId);
    }

    return(
        <div className="main-content">
            <h4 className="text-start">Explore</h4>
            {
                posts.map((post) => {
                    return(
                        <SinglePost key={post._id} data={{post, bookmarks, user, handleLikeClick, handleDisLikeClick, handleBookmarkClick, handleDeletePost, handleRemoveBookmarkClick}} />
                    )
                })
            }
    </div>
    )
}