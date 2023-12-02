import styled from "styled-components";
export const StImg = styled.img`
  width: 120px;
`;

export const StDiv = styled.div`
  display: flex;
  justify-content: ${(props) => props.$justify};
  margin: ${(props) => props.$margin};
  padding: 15px;
  list-style: none;
`;

export const StList = styled.li`
  padding: 10px 25px;
  border: 1px solid ${(props) => props.$bordercolor};
  border-radius: 10px;
  cursor: pointer;
  color: ${(props) => props.color};
  background-color: ${(props) => props.$bgcolor};

  transition: all 0.4s;

  &:hover {
    background-color: ${(props) => props.$bordercolor};
    color: white;
  }
`;

export const LetterNone = styled.div`
  text-align: center;
  font-size: x-large;
  margin-top: 100px;
  height: 24.5vh;
`;
