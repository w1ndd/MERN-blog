import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCategory } from "../redux/features/categorySlice"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AddCategoryPage = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const submitHandler = () => {
        if(!user){
            navigate('/login');
            return toast.info('You have to be logged in to create a category!');
        }
        if(name === ''){
            return toast.error('Fill in all the fields!');
        }
        try {
            dispatch(createCategory({name}))
            navigate('/categories')
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <div className="post-page-container">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="add-category-container">
                    <label> Category Name: <br/>
                        <input className="post-add-edit-title-input" value={name} onChange={e => setName(e.target.value)} type="text"></input>
                    </label>
                </div>
                    <div className="add-post-buttons-div">
                        <button className="add-post-button-add" onClick={() => submitHandler()}>Add new Category</button>
                        <Link to="/" className="add-post-button-cancel">Cancel</Link>
                    </div>
                
            </form>
        </div>
    )
}