import GlobalStyle from "GlobalStyle";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __getLetters } from "redux/modules/letter";
import Router from "shared/Router";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getLetters());
  }, [dispatch]);
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
