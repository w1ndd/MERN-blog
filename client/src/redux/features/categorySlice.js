import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    categories: [],
    loading: false,
}

export const createCategory = createAsyncThunk('category/createCategory', async({name}) => {
    try {
        const {data} = await axios.post('/categories', {name})
        return data
    } catch (e) {
        console.log(e)
    }
})

export const getAllCategories = createAsyncThunk('category/getAllCategories', async () => {
    try {
        const { data } = await axios.get('/categories')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const removeCategory = createAsyncThunk('category/removeCategory', async (id) => {
    try {
        const { data } = await axios.delete(`/categories/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: {
        //Create category
        [createCategory.pending]: (state) => {
            state.loading = true
        },
        [createCategory.fulfilled]: (state, action) => {
            state.loading = false
            //state.categories.push(action.payload)
        },
        [createCategory.rejected]: (state) => {
            state.loading = false
        },
        //get all categories
        [getAllCategories.pending]: (state) => {
            state.loading = true
        },
        [getAllCategories.fulfilled]: (state, action) => {
            state.loading = false
            state.categories = action.payload
        },
        [getAllCategories.rejected]: (state) => {
            state.loading = false
        },
        //remove
        [removeCategory.pending]: (state) => {
            state.loading = true
        },
        [removeCategory.fulfilled]: (state, action) => {
            state.loading = false
            state.categories = state.categories.filter(
                (category) => category._id !== action.payload._id,
            )
        },
        [removeCategory.rejected]: (state) => {
            state.loading = false
        },
    },
})

export default categorySlice.reducer