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
import axios from "axios";
import { editedProfile } from "redux/modules/authSilce";

function Profiles() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  // const avatar = auth.avatar;
  const nickname = auth.nickname;
  const userId = auth.userId;
  const avatar = auth.avatar;
  const [profileEdit, setProfileEdit] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState("");
  const [changeAvatarImage, setChangeAvatarImage] = useState("");
  const [changeNickname, setChangeNickname] = useState(nickname);

  console.log(avatar);
  const onChangeNicknameHandler = (e) => {
    setChangeNickname(e.target.value);
  };

  const onChangeAvatarHandler = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setChangeAvatarImage(e.target.files[0]);
      // let blob = new Blob([new ArrayBuffer(file)], { type: "image/png" });

      const url = window.URL.createObjectURL(file); // blob:http://localhost:1234/28ff8746-94eb-4dbe-9d6c-2443b581dd30

      setChangeAvatar(url);
    } else {
      const defaultImage = "/assets/img/Avatar.png";
      setChangeAvatar(defaultImage);
    }
  };

  const formData = new FormData();
  formData.append("avatar", changeAvatarImage);
  formData.append("nickname", changeNickname);

  const changeNicknameAndAvatarHandler = async () => {
    try {
      const accessToken = auth.accessToken;

      // const changeProfile = {
      //   avatar: changeAvatarImage,
      //   nickname: `${changeNickname}`,
      // };

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("답변", response);
      const imageFile = response.data.avatar;
      console.log(imageFile);
      dispatch(
        editedProfile({
          nickname: nickname && changeNickname,
          avatar: imageFile ? imageFile : avatar,
        })
      );
      alert("프로필 변경이 완료되었습니다😀");
      setProfileEdit(false);
    } catch (error) {
      alert("프로필 변경에 실패했습니다.");
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
                <StMyAvatar $src={avatar ?? changeAvatar}>
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
              </StMyPageNameBox>
            </StMyPageProfile>
          </StMyPageProfileMain>
        </StMyPageContainer>
      )}
    </>
  );
}

export default Profiles;
