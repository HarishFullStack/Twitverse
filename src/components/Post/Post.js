import dayjs from "dayjs";
import { useNavigate } from "react-router";

export function Post({data}){
    const navigate = useNavigate();

    return(
    <div className="d-flex mb-5" key={data.post._id}>

    <div className="d-flex">
        <img className="avatar cursor-pointer" alt={data.username} src={data.post.profilePic}></img></div>
    <div className="w-100">
        <b className="username cursor-pointer" onClick={() => navigate(`/profile/${data.post.username}`)}>{data.post.username}</b> | {dayjs(data.post.createdAt).format("MMM")} {dayjs(data.post.createdAt).format("D")}
        <p>{data.post.content}</p>
        <div className="">
            <div className="d-flex">
                <div className="col-md-4"><img className="actions cursor-pointer" src={data.post.likes.likedBy.find((by) => by._id === data.user._id) !== undefined ? "./assets/images/heart-red.png" : "./assets/images/heart-empty.png"} onClick={() => data.handleLikeClick(data.post._id)}></img> {data.post.likes.likeCount}</div>
                <div className="col-md-4"><img className="actions cursor-pointer" src={data.bookmarks.find((bookmark) => bookmark._id === data.post._id) !== undefined ? "./assets/images/bookmark-green.png" : "./assets/images/bookmark-black.png"} onClick={() => data.bookmarks.find((bookmark) => bookmark._id === data.post._id) !== undefined ? data.handleRemoveBookmarkClick(data.post._id) : data.handleBookmarkClick(data.post._id)}></img></div>
            </div>
        </div>
    </div>
    {data.post.username === data.user.username && <div className="nav-item dropdown dropstart float-end">
        <i className="fa fa-ellipsis-h float-end cursor-pointer nav-link" data-bs-toggle="dropdown" aria-expanded="false" aria-hidden="true"></i>
        {<ul className="dropdown-menu">
            
            <li><a className="dropdown-item" href="#">Edit</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => data.handleDeletePost(data.post._id)}>Delete</a></li>
        </ul>}
    </div>}
</div>)
}