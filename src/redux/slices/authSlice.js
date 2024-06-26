import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  data: {},
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const userSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setIsAuthenticated, setLoading, setUser, setData, setMobile, setToken } =
  userSlice.actions;
export default userSlice.reducer;
