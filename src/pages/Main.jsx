import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "components/Form";
import Letters from "components/Letters";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { __addLetter } from "redux/modules/letter";
import axios from "axios";
import { logout } from "redux/modules/authSilce";

// 색별로 나눔
const memberColor = [
  "#B4E4FF",
  "#435585",
  "#FF8080",
  "#FFFB73",
  "#D8B4F8",
  "#FFCECE",
];

const getMemberName = (color) => {
  switch (color) {
    case "#B4E4FF":
      return "효정";
    case "#435585":
      return "미미";
    case "#FF8080":
      return "유아";
    case "#FFFB73":
      return "승희";
    case "#D8B4F8":
      return "유빈";
    case "#FFCECE":
      return "아린";
    default:
      return false;
  }
};

const Main = () => {
  const { isLoding, error, letters } = useSelector((state) => state.letter);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //팬레터 없는 멤버 이름
  const [navColor, setNavColor] = useState("#B4E4FF");
  const [content, setContent] = useState("");
  const [member, setMember] = useState("효정");
  const [selectMember, setSelectMember] = useState("효정");

  // 필터링 된 멤버별 펜레터
  const [filterLetter, setfilterLetter] = useState([]);

  useEffect(() => {
    if (!isLoding) {
      const filtered = letters?.filter((v) => v.writedTo === selectMember);
      setfilterLetter(filtered);
    }
  }, [isLoding, letters, selectMember]);

  // console.log(letters);
  const nickname = localStorage.getItem("nickname");
  const avatar = localStorage.getItem("avatar");
  const userId = localStorage.getItem("userId");

  // 닉네임, 내용, 멤버

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeMember = (e) => {
    setMember(e.target.value);
  };

  // 클릭 시 펜레터 추가
  const clickNewLetterHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log(response);

      const newLetter = {
        createdAt: new Date(),
        nickname: nickname,
        avatar,
        content,
        writedTo: member,
        id: uuidv4(),
        userId,
      };
      if (content === "") {
        alert("내용을 입력해주세요.");
        e.preventDefault();
        return false;
      } else if (content.length > 200) {
        alert("내용은 최대 200자까지 가능힙니다.");
        return false;
      }
      alert("등록되었습니다😁");
      setContent("");
      dispatch(__addLetter(newLetter));
      // dispatch(addLetter(newLetter));
    } catch (error) {
      alert("토큰이 만료되었습니다. 잠시 후에 로그아웃됩니다.");
      dispatch(logout());
    }
  };

  // console.log(filterLetter);
  // 클릭 시 색 바뀌게, 멤버별 펜레터만 보이게
  const clickMColorChange = (color) => {
    setSelectMember(getMemberName(color));
    const newletter = letters.filter((letter) => {
      return letter.writedTo === getMemberName(color);
    });
    setfilterLetter(newletter);
    setNavColor(color);
  };

  if (isLoding) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    // Main 부분
    <>
      <StDiv $justify="center">
        <StImg src="/assets/img/Logo.png" />
      </StDiv>
      <nav>
        <StDiv $justify="space-evenly" $margin="20px">
          {memberColor.map((color) => {
            return (
              <StList
                $bordercolor={color}
                key={color}
                onClick={() => {
                  clickMColorChange(color);
                }}
                color={`${navColor === color ? "white" : ""}`}
                $bgcolor={`${navColor === color ? color : ""}`}
              >
                {getMemberName(color)}
              </StList>
            );
          })}
        </StDiv>
      </nav>
      {/*펜레터 등록 부분*/}
      <Form
        $btn={navColor}
        clickNewLetterHandler={clickNewLetterHandler}
        content={content}
        onChangeContent={onChangeContent}
        onChangeMember={onChangeMember}
      />
      {/*펜레터 부분*/}
      <div>
        {filterLetter?.length === 0 ? (
          <LetterNone>
            {selectMember}에게 등록된 팬레터가 없습니다! 첫 번째 팬레터의
            주인공이 되어주세요!
          </LetterNone>
        ) : (
          filterLetter?.map((letter, index) => {
            // console.log(filterLetter);
            return (
              <Letters
                navColor={navColor}
                letter={letter}
                id={letter.id}
                avatar={letter.avatar}
                createdAt={letter.createdAt}
                nickname={letter.nickname}
                content={letter.content}
                key={letter.id}
                usersId={letter.userId}
              />
            );
          })
        )}
      </div>
    </>
  );
};

const StImg = styled.img`
  width: 120px;
`;

const StDiv = styled.div`
  display: flex;
  justify-content: ${(props) => props.$justify};
  margin: ${(props) => props.$margin};
  padding: 15px;
  list-style: none;
`;

const StList = styled.li`
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

const LetterNone = styled.div`
  text-align: center;
  font-size: x-large;
  margin-top: 100px;
  height: 24.5vh;
`;
export default Main;
