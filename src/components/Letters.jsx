import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "redux/modules/authSilce";
import { useDispatch, useSelector } from "react-redux";

function Letters({
  letter,
  id,
  createdAt,
  nickname,
  avatar,
  content,
  navColor,
  usersId,
}) {
  const dispatch = useDispatch();
  const naivgate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const userNickname = auth.nickname;
  const userId = auth.userId;
  // const userImage = auth.avatar;

  const checkMemberInformation = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log(response);
      naivgate(`/detail/${letter.id}`);
    } catch (error) {
      alert("토큰이 만료되었습니다. 잠시 후에 로그아웃됩니다.");
      dispatch(logout());
    }
  };
  return (
    <ul id={id} key={id}>
      <LetterCard $bordercolor={navColor}>
        <div onClick={checkMemberInformation} to={`/detail/${letter.id}`}>
          <Avatar width="70px" src={avatar} />
          <p>{createdAt}</p>
          <p>{usersId === userId ? userNickname : nickname}</p>
          <TextOverFlow $bordercolor={navColor}>{content}</TextOverFlow>
        </div>
      </LetterCard>
    </ul>
  );
}

const LetterCard = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 500px;
  margin: 20px auto;
  padding: 10px;

  border: 3px solid ${(props) => props.$bordercolor};
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.5s;

  &:hover {
    transform: scale3d(1.05, 1.05, 1.05);
  }
`;

const Avatar = styled.img`
  border-radius: 100%;
`;

const TextOverFlow = styled.p`
  padding: 5px;
  background-color: ${(props) => props.$bordercolor};
  border-radius: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default Letters;
