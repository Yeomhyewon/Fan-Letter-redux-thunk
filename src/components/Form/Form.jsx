import React from "react";
import Button from "../Button/Button";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  Content,
  FlexBtn,
  NicknameContent,
  StDiv,
  Stselect,
  StyledForm,
} from "./styles";

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

export default Form;
