// 중앙데이터 관리소를 설정하는 부분
import letterSlice from "redux/modules/letter";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    letter: letterSlice,
  },
});

export default store;
