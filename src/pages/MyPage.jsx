import React from "react";
import styled from "styled-components";

function MyPage() {
  return (
    <StDiv>
      <div>
        <img src="assets/img/Avatar.png" alt="" />
        <p>닉네임</p>
        <p>댓글 몇개</p>
      </div>
    </StDiv>
  );
}

const StDiv = styled.div`
  height: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 5px solid #ffcece;
    border-radius: 20px;
  }

  & > div > p {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #ffcece9c;
    border-radius: 10px;
  }

  & > div > img {
    width: 50%;
    border-radius: 50%;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #ffcece9c;
  }
`;

export default MyPage;
