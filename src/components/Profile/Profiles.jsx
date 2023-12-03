import React, { useEffect, useState } from "react";
import {
  StMyAvatar,
  StMyPageContainer,
  StMyPageNameBox,
  StMyPageProfile,
  StMyPageProfileHeader,
  StMyPageProfileMain,
  StMyPageProfileNameBox,
} from "./styles";
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { editedProfile, logout } from "redux/modules/authSilce";
import { __getLetters } from "redux/modules/letter";
import jsonInstance from "api/jsonServerApi";
import { serverInstance } from "api/apiServer";
import { useParams } from "react-router-dom";

function Profiles() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const letters = useSelector((state) => state.letter.letters);
  const auth = useSelector((state) => state.auth);
  const nickname = auth.nickname;
  const avatar = auth.avatar;
  const [profileEdit, setProfileEdit] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(avatar);
  const [changeAvatarImage, setChangeAvatarImage] = useState("");
  const [changeNickname, setChangeNickname] = useState(nickname);

  useEffect(() => {
    const checkMemberInformation = async () => {
      try {
        const response = await serverInstance.get(`/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        console.log(response);
      } catch (error) {
        alert("토큰이 만료되었습니다. 잠시 후에 로그아웃됩니다.");
        dispatch(logout());
      }
    };
    checkMemberInformation();
  }, [auth.accessToken, dispatch]);

  const usersLetterId = letters
    .filter((i) => userId === i.userId)
    .map((i) => i.id);

  const onChangeNicknameHandler = (e) => {
    setChangeNickname(e.target.value);
  };

  const onChangeAvatarHandler = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setChangeAvatarImage(e.target.files[0]);

      const url = window.URL.createObjectURL(file);
      setChangeAvatar(url);
    }
  };

  const formData = new FormData();
  formData.append("avatar", changeAvatarImage);
  formData.append("nickname", changeNickname);

  const changeNicknameAndAvatarHandler = async () => {
    try {
      const accessToken = auth.accessToken;

      const response = await serverInstance.patch(`/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("답변", response);
      const imageFile = response.data.avatar;

      dispatch(
        editedProfile({
          nickname: nickname && changeNickname,
          avatar: imageFile ? imageFile : avatar,
        })
      );

      const changeddbLetterData = await Promise.all(
        usersLetterId.map((i) => {
          return jsonInstance.patch(`/letters/${i}`, {
            nickname: nickname && changeNickname,
            avatar: imageFile ? imageFile : avatar,
          });
        })
      );

      console.log("jsonServer 변경 완료", changeddbLetterData);
      dispatch(__getLetters());

      alert("프로필 변경이 완료되었습니다😀");
      setProfileEdit(false);
    } catch (error) {
      alert("프로필 변경에 실패했습니다😭");
      console.log(error);
    }
  };
  return (
    <>
      {profileEdit ? (
        <div>
          <StMyPageContainer>
            <StMyPageProfileHeader>
              <button onClick={() => setProfileEdit((edit) => !edit)}>
                {"<"} 뒤로 가기
              </button>
              <div>프로필 수정😊</div>
              <button onClick={changeNicknameAndAvatarHandler}>
                저장 하기
              </button>
            </StMyPageProfileHeader>
            <StMyPageProfileMain>
              <StMyPageProfile>
                <StMyAvatar $src={changeAvatar}>
                  <label htmlFor="changeImg">
                    <CiImageOn size={29} />
                  </label>
                  <input
                    onChange={onChangeAvatarHandler}
                    id="changeImg"
                    type="file"
                    accept=".gif, .jpg, .png"
                  />
                </StMyAvatar>
                <StMyPageProfileNameBox>
                  <input
                    type="text"
                    placeholder={"닉네임을 입력해주세요."}
                    maxLength={10}
                    value={changeNickname}
                    onChange={onChangeNicknameHandler}
                  />
                </StMyPageProfileNameBox>
              </StMyPageProfile>
            </StMyPageProfileMain>
          </StMyPageContainer>
        </div>
      ) : (
        <StMyPageContainer>
          <StMyPageProfileHeader>
            <div>안녕하세요, {nickname}님😊</div>
            <button onClick={() => setProfileEdit((edit) => !edit)}>
              프로필 수정 {">"}
            </button>
          </StMyPageProfileHeader>
          <StMyPageProfileMain>
            <StMyPageProfile>
              <StMyAvatar $src={avatar}></StMyAvatar>
              <StMyPageNameBox>
                <div>{nickname}</div>
                <p>ID : {userId}</p>
              </StMyPageNameBox>
            </StMyPageProfile>
          </StMyPageProfileMain>
        </StMyPageContainer>
      )}
    </>
  );
}

export default Profiles;
