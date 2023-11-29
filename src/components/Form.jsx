import React from "react";
import Button from "./Button";
import styled from "styled-components";

function Form({
  $btn,
  userNickname,
  content,
  clickNewLetterHandler,
  onChangeContent,
  onChangeMember,
  onChangeNickname,
}) {
  // 닉네임, 내용, 멤버
  const members = ["효정", "미미", "유아", "승희", "유빈", "아린"];
  return (
    <StyledForm>
      <StDiv $borderColor={$btn}>
        <div>
          <div>
            <p>닉네임</p>
            <NicknameContent
              placeholder="최대 8자까지 적을 수 있습니다."
              type="text"
              value={userNickname}
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <p>내용</p>
            <Content
              height="100px"
              placeholder="최대 200자까지 적을 수 있습니다."
              value={content}
              onChange={onChangeContent}
            ></Content>
          </div>
          <div>
            <label>누구에게 보내실 건가요?</label>
            <Stselect onChange={onChangeMember}>
              {members.map((member) => {
                return (
                  <option key={member} value={member}>
                    {member}
                  </option>
                );
              })}
            </Stselect>
          </div>
        </div>
        <FlexBtn>
          <Button $btn={$btn} eventHandler={clickNewLetterHandler}>
            보내기
          </Button>
        </FlexBtn>
      </StDiv>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  font-size: larger;
`;

const StDiv = styled.div`
  border: 3px solid ${(props) => props.$borderColor};
  border-radius: 10px;
  padding: 20px;

  transition: all 0.6s;
`;

const NicknameContent = styled.input`
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: #b4e4ff;
`;
const Content = styled.textarea`
  width: 100%;
  height: 80px;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: #b4e4ff;
  padding: 5px;
  resize: none;
`;

const Stselect = styled.select`
  border: none;
  border-radius: 10px;
  margin-left: 5px;
`;

const FlexBtn = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 10px;
`;

export default Form;
