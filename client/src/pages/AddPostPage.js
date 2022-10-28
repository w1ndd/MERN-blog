import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../redux/features/postSlice"
import FormData from "form-data";
import { Link } from "react-router-dom";
import { getAllCategories } from "../redux/features/categorySlice"
import { useNavigate } from "react-router-dom";
import "../styles/Add-EditPostPage.css"
import { toast } from 'react-toastify'

export const AddPostPage = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)
    const { categories } = useSelector((state) => state.category)

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    const submitHandler = () => {
        if(!user){
            navigate('/login');
            return toast.info('You have to be logged in to create a post!');
        }
        if(title === '' || text === '' || category === ''){
            return toast.error('Fill in all the fields!');
        }
        try {
            var data = new FormData()
           
            data.append('title', title)
            data.append('text', text)
            data.append('category', category)
            data.append('date', Date.now().toString())
            data.append('image', image)
            
            dispatch(createPost(data))
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div className="add-edit-post-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <label> Add picture:
                    <input className="add-picture-input" onChange={e => setImage(e.target.files[0])} type="file"></input>
                </label>

                <div className="add-post-image">
                    {image && (
                        <img className="post-page-image" src={URL.createObjectURL(image)} alt={image.name} />
                    )}
                </div>
                <div className="add-edit-post-item">
                    <label> Post title:<br/>
                        <input className="post-add-edit-title-input" value={title} onChange={e => setTitle(e.target.value)} type="text"></input>
                    </label>
                </div>
                <div className="add-edit-post-item">
                    <label> Post text: <br/>
                        <textarea className="post-add-edit-textarea" value={text} 
                        onChange={e => setText(e.target.value)} rows={25}></textarea>
                    </label> 
                </div>
                <div className="add-edit-post-item">
                    Category: <br/>
                    <select className="add-post-select" onChange={e => setCategory(e.target.value)} value={category}>
                        <option key={-1} value={''}>Select a category...</option>
                        {categories?.map((category, index) => 
                            <option key={index} value={category._id}>{category.name}</option>
                        )}
                    </select>
                </div>
                <div className="add-post-buttons-div">
                    <button className="add-post-button-add" onClick={() => submitHandler()}>Add new post</button>
                    <Link to="/" className="add-post-button-cancel" >Cancel</Link>
                </div>
            </form>
        </div>
    )
}