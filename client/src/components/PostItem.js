import { Link } from "react-router-dom";
import Moment from "react-moment"

export const PostItem = ( { post, categories } ) => {
    if(!post) {
        return ( <>Loading...</>)
    } else {
        const postCategory = categories.find(i => i._id === post.category);
        return (
            <div className="main-page-post-item">
                <Link to={`/${post._id}`}>
                    {post.image && 
                    <div className="post-item-picture-cropped">
                        <img
                                src={`http://localhost:5000/${post.image}`}
                                alt="image"
                                className="post-page-image"
                            />
                    </div>}
                    <div className="post-title-div black">{post.title}</div>
                    <div className="post-author-div"><i>by {post.username}</i></div>
                    <div className="post-category-div">Category: {postCategory?.name}</div>
                    <div className="post-text-div black">{post.text}</div>
                    <div className="post-views-date-div">
                        <div className="post-views-div">{post.views} views</div>
                        <i>{<Moment date={post.createdAt} className="post-date-div black" format='DD MMM YYYY HH:mm'/>}</i>
                    </div>
                </Link>
            </div> 
        )}
}