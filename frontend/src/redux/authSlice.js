// authSlice.js
import {createSlice} from "@reduxjs/toolkit"
const authSlice = createSlice({
    name: "auth",
    initialState: {
      userData: null,
      isAuthenticated: false,
    },
    reducers: {
      setAdmin: (state, action) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
      },
      logout: (state) => {
        state.userData = null;
        state.isAuthenticated = false;
      },
    },
  });
  
  export const { setAdmin, logout } = authSlice.actions;
  export default authSlice.reducer;
  