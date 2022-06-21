import { createSlice } from "@reduxjs/toolkit";
const middlewareActions ={
    register(){},
    login(){},
    logout(){},
    getActiveUser(){},
}

const userSlice = createSlice({
    name:'auth',
    initialState:{
    token: localStorage.getItem('token'),
    activeUser: null,
    },
    reducers:{
        setActiveUser: (state, action)=>{
            state.activeUser = action.payload;
        },
        setToken: (state, action)=>{
        state.token = action.payload
        },
        ...middlewareActions,
    }
});
export const { activeUser, getActiveUser, setActiveUser, register, login, logout, setToken} = userSlice.actions;
export default userSlice.reducer;

