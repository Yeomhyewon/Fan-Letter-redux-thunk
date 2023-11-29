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

  const clickLoginHandler = async (e) => {
    e.preventDefault();
    try {
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
      navigate("/");
    } catch {
      alert("존재하지 않는 계정입니다.");
    }
  };

  const clickMemberShipHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        id: id,
        password: pw,
        nickname,
      };
      const respones = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        newUser
      );
      console.log(respones.data);
    } catch {
      alert("이미 가입된 계정입니다.");
    }
  };

  return (
    <>
      {loginSwitch ? (
        <StLoginBox>
          <form onSubmit={clickLoginHandler}>
            <h2>로그인</h2>
            <StInput>
              <input
                type="text"
                placeholder="ID (4~10글자)"
                required
                maxLength={10}
                minLength={4}
                value={id}
                onChange={onChangeId}
              />
            </StInput>
            <StInput>
              <input
                type="password"
                placeholder="PW (4~15글자)"
                required
                maxLength={15}
                minLength={4}
                value={pw}
                onChange={onChangePw}
              />
            </StInput>
            <StLoginBtnBox>
              <button type="submit">로그인</button>
            </StLoginBtnBox>
            <div>
              <StSwitchBtn
                type="button"
                onClick={() => {
                  setLoginSwitch((b) => !b);
                }}
              >
                회원가입하기
              </StSwitchBtn>
            </div>
          </form>
        </StLoginBox>
      ) : (
        <StLoginBox>
          <form onSubmit={clickMemberShipHandler}>
            <h2>로그인</h2>
            <StInput>
              <input
                type="text"
                placeholder="ID (4~10글자)"
                required
                maxLength={10}
                minLength={4}
                value={id}
                onChange={onChangeId}
              />
            </StInput>
            <StInput>
              <input
                type="password"
                placeholder="PW (4~15글자)"
                required
                maxLength={15}
                minLength={4}
                value={pw}
                onChange={onChangePw}
              />
            </StInput>
            <StInput>
              <input
                type="text"
                placeholder="NAME (1~10글자)"
                required
                maxLength={10}
                minLength={1}
                value={nickname}
                onChange={onChangeNickname}
              />
            </StInput>
            <StLoginBtnBox>
              <button type="submit">로그인</button>
            </StLoginBtnBox>
            <div>
              <StSwitchBtn
                type="button"
                onClick={() => {
                  setLoginSwitch((b) => !b);
                }}
              >
                회원가입하기
              </StSwitchBtn>
            </div>
          </form>
        </StLoginBox>
      )}
    </>
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
