import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Letters({
  letter,
  id,
  createdAt,
  userNickname,
  avatar,
  content,
  navColor,
}) {
  return (
    <ul id={id} key={id}>
      <LetterCard $bordercolor={navColor}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/detail/${letter.id}`}
          state={navColor}
        >
          <Avatar width="70px" src={avatar} />
          <p>{createdAt}</p>
          <p>{userNickname}</p>
          <TextOverFlow $bordercolor={navColor}>{content}</TextOverFlow>
        </Link>
      </LetterCard>
    </ul>
  );
}

const LetterCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 20px auto;
  padding: 10px;

  border: 3px solid ${(props) => props.$bordercolor};

  border-radius: 15px;
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
