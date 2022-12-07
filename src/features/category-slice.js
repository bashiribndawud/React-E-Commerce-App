import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategory = createAsyncThunk("categories/fetchAll", async () => {
    try {
	    const response = await fetch(
	      "https://fakestoreapi.com/products/categories"
	    );
	    return await response.json();
    } catch (error) {
        console.log(error.message)
    }
}) 

const categorySlice = createSlice({
    name : "categorySlice",
    initialState: {
        value: [],
        loading: false
    },
    extraReducers:(builder) => {
        builder.addCase(getAllCategory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.value = action.payload,
            state.loading = false
        })
    }
})

export default categorySlice.reducer