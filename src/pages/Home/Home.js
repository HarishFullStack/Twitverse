import { useEffect, useState } from "react";
import dayjs from "dayjs";

export function Home(){

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try{
            const response = await fetch("/api/posts");
            const res = await response.json();
            console.log(res.posts);
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

    return(
        <>
            <h4 className="text-start">Home</h4>
            {
                posts.map((post) => {
                    return(
                        <div className="d-flex" key={post._id}>
                            <div><img className="avatar" alt={post.username} src={post.profilePic}></img></div>
                            <div>
                                <b>{post.username}</b> | {dayjs(post.createdAt).format("MMM")} {dayjs(post.createdAt).format("D")}
                                <p>{post.content}</p>
                                <div><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}