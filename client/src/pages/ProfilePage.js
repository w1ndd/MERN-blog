import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth } from "../redux/features/authSlice";
import { getAllPostsByUserId } from "../redux/features/postSlice";
import { getAllCommentsByUserId } from "../redux/features/commentSlice";
import { getAllCategories } from '../redux/features/categorySlice'
import "../styles/ProfilePage.css"
import { PostItem } from "../components/PostItem";
import { CommentItem } from "../components/CommentItem";

export default function ProfilePage(){
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)

    const { user, isLoading } = useSelector(state => state.auth)
    const { posts } = useSelector(state => state.post)
    const { comments } = useSelector(state => state.comment)
    const { categories } = useSelector(state=> state.category)

    const postsOpenCloseHandle = () => {
        const postsDiv = document.getElementById('my-posts-div');
        const postsButton = document.getElementById('my-posts-button');

        if (postsDiv.style.display === "none") {
            postsDiv.style.display = "block";
            postsButton.style.background = "#00b80f"
        } else {
            postsDiv.style.display = "none";
            postsButton.style.background = "#ff0000"
        }
    }

    const commentsOpenCloseHandle = () => {
        const commentsDiv = document.getElementById('my-comments-div');
        const commentsButton = document.getElementById('my-comments-button');

        if (commentsDiv.style.display === "none") {
            commentsDiv.style.display = "block";
            commentsButton.style.background = "#00b80f";
        } else {
            commentsDiv.style.display = "none";
            commentsButton.style.background = "#ff0000";
        }
    }

    // useEffect(() => {
    //     if(!isAuth) navigate('/')
    // }, [isAuth, navigate])

    useEffect(() => {
        if(isAuth){
            dispatch(getAllCommentsByUserId({author: user._id}))
            dispatch(getAllPostsByUserId({author: user._id}))
            dispatch(getAllCategories())
        }
    }, [isAuth])

    if(isLoading) return <>Loading...</>
    return(
        <div>
            <div className="profile-page-head">
                <h3>My profile page</h3><br/>
                Username:&nbsp; {user?.login}<br/>
                Email:&nbsp; {user?.email}<br/>
                <button onClick={() => postsOpenCloseHandle()} className="my-posts-button" id="my-posts-button">My posts</button>
                <button onClick={() => commentsOpenCloseHandle()} className="my-comments-button" id="my-comments-button">My comments</button>
            </div>
            
            <div id="my-posts-div" className="my-posts-div">
                <hr/> 
                <h2 className="h2">Posts:</h2>
                {posts?.length !== 0 && 
                <>
                    {posts?.map((post, index) => (
                        <PostItem key={index} post={post} categories={categories}></PostItem>
                    ))}
                </>}

                {posts?.length === 0 && <>You don't have any posts yet...</>}
            </div>
            <div id="my-comments-div" className="my-comments-div">
                <hr/>
                <h2 className="h2">Comments:</h2>
                {comments?.length !== 0 && 
                <>
                    {comments?.map((comment, index) => (
                        <CommentItem key={index} posts={posts} comment={comment}></CommentItem>
                    ))}
                </>}

                {comments?.length === 0 && <>You haven't commented once...</>}
            </div>
        </div>
        
    )
}