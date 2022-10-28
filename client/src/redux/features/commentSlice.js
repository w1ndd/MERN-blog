import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk('comment/createComment', async({text, post}) => {
    try {
        const { data } = await axios.post('/comments', {text, post})
        return data
    } catch (e) {
        console.log(e)
    }
})

export const getAllComments = createAsyncThunk('comment/getAllComments', async () => {
    try {
        const { data } = await axios.get('/comments')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getAllCommentsByPostId = createAsyncThunk('comment/getAllComments', async ({post}) => {
    try {
        const { data } = await axios.get('/comments?post=' + post)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getAllCommentsByUserId = createAsyncThunk('comment/getAllComments', async ({author}) => {
    try {
        const { data } = await axios.get('/comments?author=' + author)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const removeComment = createAsyncThunk('comment/removeComment', async (id) => {
    try {
        const { data } = await axios.delete(`/comments/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const categorySlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        //Create
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.comments.unshift(action.payload)
            state.loading = false
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },
        //get all
        [getAllComments.pending]: (state) => {
            state.loading = true
        },
        [getAllComments.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
        },
        [getAllComments.rejected]: (state) => {
            state.loading = false
        },
        //get all by postId
        [getAllCommentsByPostId.pending]: (state) => {
            state.loading = true
        },
        [getAllCommentsByPostId.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
        },
        [getAllCommentsByPostId.rejected]: (state) => {
            state.loading = false
        },
        //remove
        [removeComment.pending]: (state) => {
            state.loading = true
        },
        [removeComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = state.comments.filter(
                (comment) => comment._id !== action.payload._id,
            )
        },
        [removeComment.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default categorySlice.reducer