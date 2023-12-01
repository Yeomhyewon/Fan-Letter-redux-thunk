import styled from "styled-components";

export const StMyPageContainer = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 50px auto;
  color: black;
  align-items: center;
`;

export const StMyPageProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 900px;

  align-items: center;

  div {
    font-size: 1.5rem;
    font-weight: bold;
  }

  button {
    border-radius: 20px;
    background: linear-gradient(315deg, #d8b4f893, #ffcece, #fffa73ab);
    color: black;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
  }
`;

export const StMyPageProfileMain = styled.div`
  background: linear-gradient(315deg, #d8b4f893, #ffcece, #fffa73ab);
  color: black;
  padding: 20px;
  margin-top: 40px;
  width: 900px;
  border-radius: 30px;
`;

export const StMyAvatar = styled.div`
  background-image: url(${(props) => props.$src});
  width: 200px;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;

  label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 36px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  input {
    display: none;
  }
`;

export const StMyPageProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 30px;
    font-size: 15px;
    font-weight: bold;
  }
`;

export const StMyPageNameBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
  }
  p {
    margin-top: 35px;
  }
`;

export const StMyPageProfileNameBox = styled.div`
  input {
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-bottom: 1px solid black;
    margin-left: 10px;
    width: 200px;
    text-align: center;
    outline: none;
  }
`;
