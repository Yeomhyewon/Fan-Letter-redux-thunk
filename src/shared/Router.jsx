import React from "react";
import Detail from "pages/Detail/Detail";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "pages/Main/Main";
import Login from "pages/Login/Login";
import Profile from "pages/Profile/Profile";
import Layout from "components/Layout/Layout";
import { useSelector } from "react-redux";

function Router() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <BrowserRouter>
      {isLogin ? (
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Route>
        </Routes>
      ) : (
        <>
          <Navigate replace to={"/login"} />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default Router;
