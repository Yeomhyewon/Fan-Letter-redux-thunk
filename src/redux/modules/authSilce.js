const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
  userId: localStorage.getItem("userId"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
  accessToken: localStorage.getItem("accessToken"),
};

const authSilce = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("avatar", action.payload.avatar);
      localStorage.setItem("nickname", action.payload.nickname);

      state.avatar = action.payload.avatar;
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.isLogin = true;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      window.localStorage.clear();
      state.isLogin = false;
    },
    editedProfile: (state, action) => {
      localStorage.setItem("avatar", action.payload.avatar);
      localStorage.setItem("nickname", action.payload.nickname);

      state.avatar = action.payload.avatar;
      state.nickname = action.payload.nickname;
    },
  },
});

export const { login, logout, editedProfile } = authSilce.actions;
export default authSilce.reducer;
