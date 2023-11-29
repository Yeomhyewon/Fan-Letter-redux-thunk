import React from "react";
import Detail from "pages/Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "pages/Main";
import Login from "pages/Login";
import Profile from "pages/Profile";
import Layout from "components/Layout/Layout";
import { useSelector } from "react-redux";

function Router() {
  const isLogin = useSelector((state) => {
    console.log(state.auth.isLogin);
    return state.auth.isLogin;
  });
  return (
    <BrowserRouter>
      <Routes>
        {!isLogin ? (
          <Route path="/login" element={<Login />} />
        ) : (
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
