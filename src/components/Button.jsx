import React from "react";
import styled from "styled-components";

function Button({ eventHandler, children, $margin }) {
  return (
    <StBtn $margin={$margin} onClick={eventHandler}>
      {children}
    </StBtn>
  );
}

const StBtn = styled.button`
  padding: 10px 25px;
  margin: ${(props) => props.$margin};
  border: none;
  border-radius: 10px;
  border-bottom: 4px solid #5473797d;
  background: linear-gradient(315deg, #eee29f76, #9adbe87e, #f4a6d77a);

  font-size: large;
  cursor: pointer;
  transition: all 0.1s;

  &:active {
    transform: translateY(3px);
    border-bottom: 2px solid #5473797d;
  }
`;

export default Button;
