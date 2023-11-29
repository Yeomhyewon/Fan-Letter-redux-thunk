import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <div>
      <StHeader>
        <li>HOME</li>
        <li>PROFILE</li>
        <li>LOGOUT</li>
      </StHeader>
    </div>
  );
}

const StHeader = styled.ul`
  display: flex;
  justify-content: space-around;

  padding: 10px;
  font-size: large;

  & > li {
    color: #435585;
    transition: all 0.4s;
    cursor: pointer;
    &:hover {
      color: #d8b4f8;
    }
  }
`;

export default Header;
