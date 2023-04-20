import { ReduxState } from "@/types/state.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ReduxState = {
  mode: "dark",
  user: null,
  profile: null,
  token: null,
  posts: [],
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setConnections: (state, action) => {
      if (!state.user) return;
      if (state.profile !== null) {
        state.profile.connections = action.payload.connections;
        return;
      }
      state.user.connections = action.payload.connections;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const {
  setMode,
  setLogin,
  setUser,
  setLogout,
  setConnections,
  setProfile,
  setPosts,
  setPost,
  setLoading,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
