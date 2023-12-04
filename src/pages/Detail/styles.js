import styled from "styled-components";

export const StImg = styled.img`
  height: 100px;
  border-radius: 100%;
`;

export const LetterImgName = styled.div`
  display: flex;
  align-items: center;

  font-weight: bold;
`;
export const NicknName = styled.p`
  margin-left: 10px;
`;

export const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(315deg, #eee29f76, #9adbe87e, #f4a6d77a);
  border-radius: 20px;

  padding: 30px;
  margin: 160px 50px;

  font-size: large;
`;

export const StWritedTo = styled.p`
  margin: 10px 0px;

  font-weight: bold;
`;

export const StContent = styled.p`
  background: linear-gradient(315deg, #eee29f76, #9adbe87e, #f4a6d77a);
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;

export const DateButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  background: linear-gradient(315deg, #eee29f76, #9adbe87e, #f4a6d77a);
  border: none;
  resize: none;
  outline: none;

  font-size: large;
`;

export const StHeight = styled.div`
  height: 100vh;
`;
