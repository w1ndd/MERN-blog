import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser } from "../redux/features/authSlice";
import "../styles/Login-register.css"
import { toast } from 'react-toastify'

export default function LoginPage(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()

    const {status} = useSelector(state => state.auth)

    const handleSubmit = () => {
        try{
            dispatch(loginUser({login, password}))
        } catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(isAuth) navigate('/')
    }, [isAuth, navigate])

    useEffect(() => {
        if(status){
            toast.info(status);
        }
    }, [status])

    return(
        <div className="login-page">
            <div className="login-container">
                <form onSubmit={(e) => e.preventDefault()} >
                    <div className="login-header">
                        <h1>Login</h1>
                    </div>
                    <div className="form-item">
                        <label>
                            <input className="login-input" placeholder="Username" value={login} onChange={e => setLogin(e.target.value)} type="text"></input>
                        </label>
                    </div>
                    <div className="form-item">
                        <label>
                            <input className="login-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password"></input>
                        </label>
                    </div>
                    <div className="div-register-buttons">
                        <button type="submit" onClick={() => handleSubmit()} className="login-form-submit">Login</button>
                        <div className="login-register-travel-div">
                            <Link to="/register" className="login-register-travel-link">Don't have an account?</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}