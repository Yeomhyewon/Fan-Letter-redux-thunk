import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  font-size: larger;
`;

export const StDiv = styled.div`
  border: 3px solid ${(props) => props.$borderColor};
  border-radius: 10px;
  padding: 20px;

  transition: all 0.6s;
`;

export const NicknameContent = styled.div`
  width: 100%;
  padding: 5px;
  margin: 10px 0px 15px 0px;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: #b4e4ff;
`;
export const Content = styled.textarea`
  width: 100%;
  height: 80px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 5px;
  background-color: #b4e4ff;
  padding: 5px;
  resize: none;
`;

export const Stselect = styled.select`
  border: none;
  border-radius: 10px;
  margin-left: 5px;
`;

export const FlexBtn = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 10px;
`;
