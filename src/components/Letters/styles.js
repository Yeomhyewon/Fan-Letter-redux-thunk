import styled from "styled-components";

export const LetterCard = styled.div`
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

export const Avatar = styled.img`
  height: 70px;
  border-radius: 100%;
`;

export const TextOverFlow = styled.p`
  padding: 10px;
  margin-top: 10px;
  background-color: ${(props) => props.$bordercolor};
  border-radius: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
