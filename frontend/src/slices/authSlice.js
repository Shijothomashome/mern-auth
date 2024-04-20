import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        clearCredentials: (state) => {
            state.userInfo = null;  // removing state
            localStorage.removeItem('userInfo');   // removing local storage
        }
    }
})

export const {setCredentials, clearCredentials} = authSlice.actions;
export default authSlice.reducer