import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "redux/modules/authSilce";
import { StHeader } from "./styles";
import { serverInstance } from "api/apiServer";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userId = auth.userId;
  const clickLogoutHandler = () => {
    alert("로그아웃 되었습니다.");
    navigate("/login");
    dispatch(logout());
  };

  const checkMemberInformation = async () => {
    try {
      const response = await serverInstance.get(`/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log(response);
      navigate(`/profile/${userId}`);
    } catch (error) {
      alert("토큰이 만료되었습니다. 잠시 후에 로그아웃됩니다.");
      dispatch(logout());
    }
  };
  return (
    <div>
      <StHeader>
        <Link to={"/"}>
          <li>HOME</li>
        </Link>
        <li onClick={checkMemberInformation}>PROFILE</li>
        <li onClick={clickLogoutHandler}>LOGOUT</li>
      </StHeader>
    </div>
  );
}

export default Header;
