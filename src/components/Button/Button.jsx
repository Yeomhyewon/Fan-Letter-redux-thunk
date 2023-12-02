import React from "react";
import { StBtn } from "./styles";

function Button({ eventHandler, children, $margin }) {
  return (
    <StBtn $margin={$margin} onClick={eventHandler}>
      {children}
    </StBtn>
  );
}

export default Button;
