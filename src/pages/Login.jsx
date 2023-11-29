import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "redux/modules/authSilce";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginSwitch, setLoginSwitch] = useState(true);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");

  const onChangeId = (e) => setId(e.target.value);
  const onChangePw = (e) => setPw(e.target.value);
  const onChangeNickname = (e) => setNickname(e.target.value);

  const clickMemberShipHandler = async (e) => {
    e.preventDefault();
    if (loginSwitch) {
      const user = {
        id,
        password: pw,
      };
      const reponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        user
      );
      console.log(reponse.data);
      dispatch(login(reponse.data));
    } else {
      const newUser = {
        id: id,
        password: pw,
        nickname,
      };
      const respones = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        newUser
      );
      console.log(respones);
    }
  };

  return (
    <StLoginBox>
      <form onSubmit={clickMemberShipHandler}>
        <h2>{loginSwitch ? "로그인" : "회원가입"}</h2>
        <StInput>
          <input
            type="text"
            placeholder="ID (4~10글자)"
            value={id}
            onChange={onChangeId}
          />
        </StInput>
        <StInput>
          <input
            type="password"
            placeholder="PW (4~15글자)"
            value={pw}
            onChange={onChangePw}
          />
        </StInput>
        {!loginSwitch && (
          <StInput>
            <input
              type="text"
              placeholder="NAME (4~10글자)"
              value={nickname}
              onChange={onChangeNickname}
            />
          </StInput>
        )}
        <StLoginBtnBox>
          <button type="submit">{loginSwitch ? "로그인" : "가입하기"}</button>
        </StLoginBtnBox>
        <div>
          <StSwitchBtn
            type="button"
            onClick={() => {
              setLoginSwitch((b) => !b);
            }}
          >
            {loginSwitch ? "회원가입하기" : "로그인하기"}
          </StSwitchBtn>
        </div>
      </form>
    </StLoginBox>
  );
}

const StLoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px;
    border-radius: 20px;
    width: 30%;
    height: 40%;

    background: linear-gradient(315deg, #d8b4f893, #ffcece, #fffa73ab);

    & > h2 {
      text-align: center;
    }
  }
`;

const StInput = styled.div`
  width: 60%;

  & > input {
    width: 100%;
    background-color: #d8b4f87a;
    border-radius: 20px;
    padding: 15px 15px 15px 20px;
  }
`;

const StLoginBtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;

  & > button {
    padding: 10px;
    width: 100%;
    border-radius: 20px;
    background-color: #d8b4f8d3;
    cursor: pointer;
  }
`;

const StSwitchBtn = styled.button`
  text-decoration: underline;
  color: #0000008b;
  font-weight: bold;
  cursor: pointer;
`;

export default Login;
