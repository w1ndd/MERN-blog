import '../styles/App.css';
import { Routes, Link, Route } from 'react-router-dom';
import RegisterPage from "../pages/RegisterPage";
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from '../redux/features/authSlice';
import { checkIsAuth, logout } from '../redux/features/authSlice'
import { AddPostPage } from '../pages/AddPostPage';
import { AddCategoryPage } from '../pages/AddCategoryPage'
import { PostPage } from '../pages/PostPage'
import CategoriesPage from '../pages/CategoriesPage'
import { EditPostPage } from '../pages/EditPostPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from '../pages/ProfilePage';

function App() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    const isAuth = useSelector(checkIsAuth)

    return (
    <>
        <header>
            <b><div className="nav-bar">
                <div className="main-links-div">
                    <Link to="/" className="home-link link">Home </Link>
                    <Link to="/categories" className='link'>Categories</Link> 
                </div>

                {!isAuth &&
                    <div className="login-register-links-div">
                        <Link to="/register" className="link">Register </Link>
                        <Link to="/login" className="login-link link">Login </Link>
                    </div>}
                
                {isAuth && 
                <div className="profile-links-div">
                    <Link to="/profile" className='link'>Profile</Link>
                    <button className="nav-logout-button" onClick={() => logoutHandler()}>Log out</button>
                </div> }
            </div></b>
        </header>
        <hr/>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<MainPage />} />
            <Route path="/addPost" element={<AddPostPage />}/>
            <Route path="/addCategory" element={<AddCategoryPage />}/>
            <Route path="/:id" element={<PostPage/>}/>
            <Route path="/categories" element={<CategoriesPage/>}/>
            <Route path="/:id/edit" element={<EditPostPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
        <ToastContainer 
            position='bottom-right' 
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="dark"/>
        <footer></footer>
    </>
    );
}

export default App;
