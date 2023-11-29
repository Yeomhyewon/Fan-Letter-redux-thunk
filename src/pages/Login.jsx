import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  return (
    <StLoginBox>
      <div>
        <h2>로그인</h2>
        <StInput>
          <input type="text" placeholder="ID (4~10글자)" />
        </StInput>
        <StInput>
          <input type="password" placeholder="PW (4~15글자)" />
        </StInput>
        <StBtnBox>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            로그인
          </button>
        </StBtnBox>
        <StBtnBox>
          <button>회원가입</button>
        </StBtnBox>
      </div>
    </StLoginBox>
  );
}

const StLoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  & > div {
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

const StBtnBox = styled.div`
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

export default Login;
