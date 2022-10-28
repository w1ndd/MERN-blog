import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removePost } from "../redux/features/postSlice"
import { createComment, removeComment, getAllCommentsByPostId } from "../redux/features/commentSlice"
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import '../styles/PostPage.css';
import { toast } from 'react-toastify'
import Moment from "react-moment"

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [text, setText] = useState('')

    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const commentSubmitHandler = async() => {
        try {
            if(!user){
                navigate('/login');
                return toast.info('You have to be logged in to comment!');
            }
            dispatch(createComment({text, post: params.id}))
            setText('')
        } catch (e) {
            console.log(e)
        }
    }

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const removeCommentHandler = (id) => {
        try {
            dispatch(removeComment(id))
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPost = useCallback(async() =>{
        const {data} = await axios.get('/posts/' + params.id)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
        dispatch(getAllCommentsByPostId({post: params.id}))
    }, [fetchPost, params.id, dispatch])

    if(!post){
        return(<>Loading...</>)
    }
    return(
        <div className="post-page-container">
            <div className="post-page-image-container">
                {post?.image && (
                    <img
                        src={`http://localhost:5000/${post.image}`}
                        alt="image"
                        className="post-page-image"
                    />
                )}
            </div>
            <div className="post-page-info-container">
                <i><p className="post-page-time">{<Moment date={post.createdAt} 
                className="post-date-div black" format='DD MMM YYYY HH:mm:ss'/>}</p></i>
                <h1 className="post-page-title">{post?.title}</h1>  
                <i><p className="post-page-post-author">by {post?.username}</p></i>
                <p className="post-page-post-text">{post?.text} </p>
               
                <i><p className="post-page-views">Views: {post?.views}</p></i>
            </div>

            {post?.author === user?._id && <div className="post-page-edit-container">
                <button className="post-page-delete-button" onClick={removePostHandler}>
                    <div className="post-page-button-div red">Delete</div></button>
                <Link to={`/${params.id}/edit`} className="post-page-link">
                    Edit</Link>
                <Link to="/" className="post-page-link">
                    Back to list</Link>
            </div>}
            {post?.author != user?._id && <Link to="/" className="post-page-link">
                    Back to list</Link>}

            <div className="post-page-add-comment-container">
                Comment this post:
                <form onSubmit={(e) => e.preventDefault()}>
                        <textarea className="post-page-comment-textarea" value={text} onChange={e => setText(e.target.value)} type="text"
                        rows={3}></textarea>
                        <button className="post-page-comment-add-button" onClick={() => commentSubmitHandler()}>Add comment</button>       
                </form>
            </div>

            <div className="post-page-comments">
                <h2 className="h2">Comments to this post:</h2>
                {comments?.length !== 0 && 
                <>
                    {comments?.map((comment, index) => (
                        <div className="post-page-comment" key={index}>
                            {index + 1})<b> {comment.authorName} </b>
                            <i className="post-page-comment-date">{<Moment date={post.createdAt} format='DD MMM YYYY hh:mm:ss'/>}</i>
                            <br/><br/>
                            <p className="post-page-post-text">{comment.text} </p><br/> 
                            {comment.author !== user?._id && <br/>}
                            {comment.author === user?._id && 
                            <button onClick={() => removeCommentHandler(comment?._id, index)} 
                            className="post-page-comment-delete red">Delete this comment</button>}
                        </div>
                    ))}
                </>}
                {comments?.length === 0 && <>This post has no comments yet...</>}
            </div>
        </div>
    )
}