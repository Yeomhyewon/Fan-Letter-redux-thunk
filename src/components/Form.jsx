import React from "react";
import Button from "./Button";
import styled from "styled-components";
import { useSelector } from "react-redux";

function Form({
  $btn,
  content,
  clickNewLetterHandler,
  onChangeContent,
  onChangeMember,
}) {
  const auth = useSelector((state) => state.auth);
  const nickname = auth.nickname;

  // 닉네임, 내용, 멤버
  const members = ["효정", "미미", "유아", "승희", "유빈", "아린"];
  return (
    <StyledForm>
      <StDiv $borderColor={$btn}>
        <div>
          <div>
            <p>닉네임</p>
            <NicknameContent>{nickname}</NicknameContent>
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

const NicknameContent = styled.div`
  width: 100%;
  padding: 5px;
  margin: 10px 0px 15px 0px;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: #b4e4ff;
`;
const Content = styled.textarea`
  width: 100%;
  height: 80px;
  border-radius: 10px;
  margin-top: 10px;
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
