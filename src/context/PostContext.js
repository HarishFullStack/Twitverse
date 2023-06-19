import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext();

export function PostProvider({children}){

    const {user, followList, setFollowList} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [bookmarks, setBookmarks] = useState(user.bookmarks);


    const likePost = async (postId) => {
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

    const bookmarkPost = async (postId) => {
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

    const removeBookmark = async (postId) => {
        try{
            const response = await fetch(`/api/users/remove-bookmark/${postId}/`, {
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

    const deletePost = async (postId) => {
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
        <PostContext.Provider value={{posts, setPosts, bookmarks, setBookmarks, likePost, bookmarkPost, removeBookmark, deletePost}}>
            {children}
        </PostContext.Provider>
    )
}