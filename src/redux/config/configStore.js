// 중앙데이터 관리소를 설정하는 부분
import letterSlice from "redux/modules/letter";
import authSilce from "redux/modules/authSilce";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    letter: letterSlice,
    auth: authSilce,
  },
});

export default store;
