import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "redux/modules/authSilce";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, LetterCard, TextOverFlow } from "./styles";

function Letters({ letter, navColor }) {
  const dispatch = useDispatch();
  const naivgate = useNavigate();
  const auth = useSelector((state) => state.auth);

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
    <ul id={letter.id} key={letter.id}>
      <LetterCard $bordercolor={navColor}>
        <div onClick={checkMemberInformation} to={`/detail/${letter.id}`}>
          <Avatar width="70px" src={letter.avatar} />
          <p>
            <time>
              {new Date(letter.createdAt).toLocaleDateString("ko", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </p>
          <p>{letter.nickname}</p>
          <TextOverFlow $bordercolor={navColor}>{letter.content}</TextOverFlow>
        </div>
      </LetterCard>
    </ul>
  );
}

export default Letters;
