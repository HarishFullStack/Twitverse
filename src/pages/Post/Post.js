import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../context/PostContext";
import { SinglePost } from "../../components/SinglePost/SinglePost";

export function Post(){
    const {postId} = useParams();
    const navigate = useNavigate();

    const {user, followList, setFollowList} = useContext(AuthContext);
    const {posts, setPosts, bookmarks, setBookmarks, likePost, disLikePost, bookmarkPost, removeBookmark, deletePost} = useContext(PostContext);

    const [post, setPost] = useState({});

    const getPost = async () =>{
        setPost(posts.find((x) => x._id === postId));
    }

    useEffect(() => {
        getPost();
    }, [])

    const handleLikeClick = async (postId) => {
        const posts = await likePost(postId);
        setPost(posts.find((x) => x._id === postId));
    }

    const handleDisLikeClick = async (postId) => {
        const posts = await disLikePost(postId);
        setPost(posts.find((x) => x._id === postId));
    }

    const handleBookmarkClick = (postId) => {
        bookmarkPost(postId)
    }

    const handleDeletePost = (postId) => {
        deletePost(postId);
        setPost(null);
    }

    const handleRemoveBookmarkClick = (postId) => {
        removeBookmark(postId);
    }

    return(
        <div className="main-content">
            <div className="row">
                <div className="d-flex align-items-center fit-content back-button" onClick={() => navigate("/home")}><i className="fa fa-arrow-left" aria-hidden="true"></i></div>
                <div className="fit-content"><h4 className="text-start">Post</h4></div>
            </div>
            {post && <SinglePost key={post._id} data={{post, bookmarks, user, handleLikeClick, handleDisLikeClick, handleBookmarkClick, handleDeletePost, handleRemoveBookmarkClick}} />}
        </div>
    )
}