import Moment from "react-moment"
import { useDispatch } from "react-redux"
import { removeComment } from "../redux/features/commentSlice"

export const CommentItem = ( { comment, posts } ) => {

    const dispatch = useDispatch();

    const removeCommentHandler = (id) => {
        try {
            dispatch(removeComment(id))
        } catch (error) {
            console.log(error)
        }
    }

    if(!comment) {
        return ( <>Loading...</>)
    } else {
        const post = posts.find(i => i._id === comment.post);
        return (
            <div className="comment-item">
                <div>Post title: {post?.title}</div><br/>
                <div>Comment: {comment.text}</div><br/>
                <div className="comment-item-date"><Moment date={comment.createdAt} format='DD MMM YYYY HH:mm'/></div>
                <button onClick={() => removeCommentHandler(comment?._id)} 
                        className="post-page-comment-delete red">Delete this comment</button>
            </div> 
        )}
}