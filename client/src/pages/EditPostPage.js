import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../redux/features/postSlice"
import FormData from "form-data";
import { Link } from "react-router-dom";
import { getAllCategories } from "../redux/features/categorySlice"
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import "../styles/Add-EditPostPage.css"
import { toast } from 'react-toastify'

export const EditPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { categories } = useSelector((state) => state.category)

    const fetchPost = useCallback(async() => {
        const {data} = await axios.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setCategory(data.category)
        setOldImage(data.image)
    }, [params.id])

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    const submitHandler = () => {
        if(title === '' || text === '' || category === ''){
            return toast.error('Fill in all the fields!');
        }
        try {
            var data = new FormData()
           
            data.append('title', title)
            data.append('text', text)
            data.append('category', category)
            data.append('id', params.id)
            data.append('date', Date.now().toString())
            if(newImage !== '') data.append('image', newImage)
            
            dispatch(updatePost(data))
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div className="add-edit-post-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="add-edit-post-item">
                    <label> Add picture:
                        <input className="add-picture-input" onChange={e => {setNewImage(e.target.files[0]); setOldImage('')}} type="file"></input>
                    </label>
                </div>

                <div className="add-post-image">
                    
                    {oldImage && (
                        <img
                        src={`http://localhost:5000/${oldImage}`}
                        alt={oldImage.name}
                        className="post-page-image"/>
                    )}
                    {newImage && (
                        <img className="post-page-image" src={URL.createObjectURL(newImage)} alt={newImage.name} />
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
                        <option key={-1} value={''}>Select category...</option>
                        {categories?.map((category, index) => 
                            <option key={index} value={category._id}>{category.name}</option>
                        )}
                    </select>
                </div>
                <div className="add-post-buttons-div">
                    <button className="add-post-button-add" onClick={() => submitHandler()}>Save</button>
                    <Link to="/" className="add-post-button-cancel" >Cancel</Link>
                </div>
            </form>
        </div>
    )
}