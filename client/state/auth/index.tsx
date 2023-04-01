import { ReduxState } from "@/types/state.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ReduxState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user === action.payload.user;
      state.token === action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setConnections: (state, action) => {
      if (state.user) {
        state.user.connections = action.payload.friend;
      } else {
        console.log("User connection not exists");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;

        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setConnections,
  setPosts,
  setPost,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
