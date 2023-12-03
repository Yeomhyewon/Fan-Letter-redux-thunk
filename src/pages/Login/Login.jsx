import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "redux/modules/authSilce";
import { StInput, StLoginBox, StLoginBtnBox, StSwitchBtn } from "./styles";
import { serverInstance } from "api/apiServer";

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
      const reponse = await serverInstance.post(`/login`, user);
      alert("로그인 되었습니다.");
      dispatch(login(reponse.data));
      navigate("/");
    } catch (error) {
      console.log(error);
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
      const respones = await serverInstance.post(`/register`, newUser);
      alert("가입되었습니다!😀");
      setId("");
      setPw("");
      setLoginSwitch(true);
      console.log(respones.data);
    } catch (error) {
      console.log(error);
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
                  setLoginSwitch((state) => {
                    setId("");
                    setPw("");
                    return !state;
                  });
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
            <h2>회원가입</h2>
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
              <button type="submit">회원가입하기</button>
            </StLoginBtnBox>
            <div>
              <StSwitchBtn
                type="button"
                onClick={() => {
                  setLoginSwitch((state) => !state);
                }}
              >
                로그인하기
              </StSwitchBtn>
            </div>
          </form>
        </StLoginBox>
      )}
    </>
  );
}

export default Login;
