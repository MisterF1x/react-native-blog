import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: { userId: "", name: "", email: "", picture: null },
  posts: [],
  userPosts: [],
  isLoading: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.posts = [];
      state.userPosts = [];
    },
    signUp(state, { payload }) {
      state.userInfo = payload;
    },
    setUserImg(state, { payload }) {
      state.userInfo.picture = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
    addPost({ posts }, { payload }) {
      posts.push(payload);
    },
    addUserPost({ userPosts }, { payload }) {
      userPosts.push(payload);
    },
    resetPosts(state, __) {
      state.posts = [];
    },
    resetUserPosts(state, __) {
      state.userPosts = [];
    },
    updateLikes(state, { payload }) {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.postId === payload.postId) {
            return { ...post, likes: payload.likes };
          } else {
            return post;
          }
        }),
        userPosts: state.userPosts.map((post) => {
          if (post.postId === payload.postId) {
            return { ...post, likes: payload.likes };
          } else {
            return post;
          }
        }),
      };
    },
    updateComments(state, { payload }) {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.postId === payload) {
            return { ...post, comments: post.comments + 1 };
          } else {
            return post;
          }
        }),
        userPosts: state.userPosts.map((post) => {
          if (post.postId === payload) {
            return { ...post, comments: post.comments + 1 };
          } else {
            return post;
          }
        }),
      };
    },
  },
});

export const authReducer = authSlice.reducer;
export const {
  logout,
  signUp,
  setIsLoading,
  setUserImg,
  addPost,
  addUserPost,
  resetPosts,
  resetUserPosts,
  updateLikes,
  updateComments,
} = authSlice.actions;
