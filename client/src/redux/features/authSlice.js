import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

export const registerUser = createAsyncThunk('auth/registerUser', 
    async ({login, email, password}) => {
        try{
            const {data} = await axios.post('/registration', {login, email, password})
            //login straight after registration
            if(data.token){
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (e){
            console.log(e)
        }
})

export const loginUser = createAsyncThunk('auth/loginUser', 
    async ({login, password}) => {
        try{

            const {data} = await axios.post('/login', {login, password})
            
            if(data.token){
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (e){
            console.log(e)
        }
})

export const getMe = createAsyncThunk('auth/getMe', async () => {
        try{
            const {data} = await axios.get('/me')
            return data
        } catch (e){
            console.log(e)
        }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {

        //registration

        [registerUser.pending]: (state) => {
            state.isLoading = true 
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejectedWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        //login

        [loginUser.pending]: (state) => {
            state.isLoading = true 
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejectedWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        //check if authorized

        [getMe.pending]: (state) => {
            state.isLoading = true 
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [getMe.rejectedWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions

export default authSlice.reducer
