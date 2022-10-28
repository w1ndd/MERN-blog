import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories , removeCategory} from '../redux/features/categorySlice'
import { Link } from 'react-router-dom'
import '../styles/Categories.css';

export default function CategoriesPage(){
    const dispatch = useDispatch()
    const  { categories }  = useSelector((state) => state.category)

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    const removeCategoryHandler = (id) => {
        try {
            dispatch(removeCategory(id))
        } catch (error) {
            console.log(error)
        }
    }

    if(!categories.length){
        return(
            <>No categories...</>
        )
    }

    return(
        <>
            <div className="main-page-head">
                <h3>Posts categories page.</h3><br/>
                Here you can add and delete categories.<br/>
                You can't delete a category if some of the posts use it.<br/>
                <Link to="/addCategory" className='add-post-link'>Add category</Link>
            </div>
            <div className="categories-container">
                {categories?.map((category, index) => (
                    <div key={index} className="category-item">{category?.name} <br/> <br/>
                        Number of posts: {category?.posts.length}
                        <br/> {category.posts.length === 0 && <button className='remove-category-button' onClick={() => removeCategoryHandler(category?._id)}>
                        Delete</button>}  
                    </div>
                ))}
            </div>
        </>
    )
}