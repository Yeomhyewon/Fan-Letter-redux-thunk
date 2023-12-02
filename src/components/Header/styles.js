import styled from "styled-components";

export const StHeader = styled.ul`
  display: flex;
  justify-content: space-around;

  padding: 10px;
  font-size: large;
  a {
    color: #435585;
  }
  & > li {
    color: #435585;
    transition: all 0.4s;
    cursor: pointer;
    &:hover {
      color: #d8b4f8;
    }
  }
`;
