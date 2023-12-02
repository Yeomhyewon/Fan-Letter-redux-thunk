import styled from "styled-components";

export const StLoginBox = styled.div`
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
      font-size: xx-large;
      font-weight: bold;
    }
  }
`;

export const StInput = styled.div`
  width: 60%;

  & > input {
    width: 100%;
    background-color: #d8b4f87a;
    border-radius: 20px;
    padding: 15px 15px 15px 20px;
  }
`;

export const StLoginBtnBox = styled.div`
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

export const StSwitchBtn = styled.button`
  text-decoration: underline;
  color: #0000008b;
  font-weight: bold;
  cursor: pointer;
`;
