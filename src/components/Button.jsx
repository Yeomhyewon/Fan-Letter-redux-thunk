import React from "react";
import styled from "styled-components";

function Button({ eventHandler, $btn, children, $margin }) {
  return (
    <StBtn $btn={$btn} $margin={$margin} onClick={eventHandler}>
      {children}
    </StBtn>
  );
}

const StBtn = styled.button`
  padding: 10px 25px;
  margin: ${(props) => props.$margin};
  border: none;
  border-radius: 10px;

  background-color: ${(props) => props.$btn};

  font-size: large;
  font-family: "omyu_pretty";
  cursor: pointer;
  transition: all 0.6s;
  &:hover {
    background-color: ${(props) => props.$btn};
    box-shadow: 0px 0px 6px 6px ${(props) => props.$btn};
  }
`;

export default Button;
