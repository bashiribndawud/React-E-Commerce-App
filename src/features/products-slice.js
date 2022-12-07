import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

// action(products/fetchAll) that will get dispatch
export const fetchAllProducts = createAsyncThunk("products/fetchAll", async () => {
    try {
	    const response = await fetch(`https://fakestoreapi.com/products`);
	    return await response.json();
    } catch (error) {
        console.log(error.message)
    }
}); 



const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        value: [],
        loading: false
    },
    extraReducers:(builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchAllProducts.fulfilled, (state, action)=> {
            state.value = action.payload
            state.loading = false
            console.log(state.value)
        });
    }
});

// export const {} = productSlice.actions


export default productSlice.reducer