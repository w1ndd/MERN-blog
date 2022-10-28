import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/features/postSlice'
import { getAllCategories } from '../redux/features/categorySlice'
import { PostItem } from '../components/PostItem'
import { Link } from "react-router-dom";
import "../styles/MainPage.css"


export default function MainPage(){
    const dispatch = useDispatch()
    const [category, setCategory] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const { posts }  = useSelector((state) => state.post)
    const { popularPosts } = useSelector((state) => state.post)
    const { categories } = useSelector((state) => state.category)

    useEffect(() => {
        if(category !== ''){
            const fPosts = posts.filter((row) => row.category === category)
            setFilteredPosts(fPosts)
        } else {
            setFilteredPosts(posts)
        }
    }, [category])

    useEffect(() => {
        setFilteredPosts(posts)
    }, [posts])

    useEffect(() => {
        dispatch(getAllPosts())
        dispatch(getAllCategories())
    }, [dispatch])

    if(!posts?.length){
        return(
            <>No posts...</>
        )
    }
    return(
        <>
        <div className="main-page-head">
            <h3>Homepage.</h3><br/>
            Choose any post to read and comment or add a new one!<br/>
            <Link to="/addPost" className='add-post-link'>Add Post</Link>
        </div>
        
        <div className="main-page-container">
            <div className="main-page-posts-container">
                <p className='select-text'>Select a category to filter list of posts:</p>
                <select className="main-page-category-select" onChange={e => setCategory(e.target.value)} value={category}>
                    <option key={-1} value={''}>All categories</option>
                    {categories?.map((category, index) => 
                        <option key={index} value={category._id}>{category.name}</option>
                    )}
                </select>
                
                {filteredPosts?.map((post, index) => (
                    <PostItem key={index} post={post} categories={categories}></PostItem>
                ))}
            </div>
            <div className="main-page-popular-posts-container">
                <h2>Popular posts:</h2>
                {popularPosts?.map((post, index) => (
                    <div className="popular-post-item" key={index}>
                        <Link to={`/${post._id}`} className="black" key={index}>
                            <div className="webkit add-post-link" key={index}>
                                {index + 1}) {post.title}<br/>
                            </div>
                            ({post.views} views)
                        </Link>
                    </div>    
                ))}
            </div>
        </div>
        </>
    )
}