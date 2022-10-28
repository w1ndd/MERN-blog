import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, checkIsAuth } from "../redux/features/authSlice";
import { toast } from 'react-toastify'


export default function RegisterPage(){
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()

    const {status} = useSelector(state => state.auth)

    const handleSubmit = () => {
        try{
            dispatch(registerUser({login, email, password}))
        } catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(status){
            toast.info(status);
        }
    }, [status])

    useEffect(() => {
        if(isAuth) navigate('/')
    }, [isAuth, navigate])

    return(
        <div className="login-page">
            <div className="login-container">
                <form onSubmit={e => e.preventDefault()}>
                    <div className="register-header">
                        <h1>Register</h1>
                    </div>
                    <div className="form-item">
                        <label>
                            <input placeholder="Username" value={login} onChange={e => setLogin(e.target.value)} type="text" className="register-form-input"></input>
                        </label>
                    </div>
                    <div className="form-item">
                        <label>
                            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="text"></input>
                        </label>
                    </div>
                    <div className="form-item">
                        <label>
                           <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password"></input>
                        </label>
                    </div>
                    <div className="div-register-buttons">
                        <button type="submit" onClick={() => handleSubmit()} className="login-form-submit">Register</button>
                        <div className="login-register-travel-div">
                            <Link to="/login" className="login-register-travel-link">Already have an account?</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}