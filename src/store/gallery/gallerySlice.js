import {createSlice} from '@reduxjs/toolkit'
const middlewareActions = {
    getGalleries(){}
}

const gallerySlice = createSlice({
    name:'galleries',
    initialState:{
        data:[],
    },
    reducers:{
        
        setGalleries:(state, action)=>{
            state.galleries = action.payload;
        },
         ...middlewareActions,
    },
   
})
export const {getGalleries, setGalleries} = gallerySlice.actions;
export default gallerySlice.reducer;