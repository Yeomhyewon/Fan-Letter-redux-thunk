import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __deleteLetter, __editLetter } from "redux/modules/letter";
import Button from "components/Button";
import styled from "styled-components";
import axios from "axios";
import { logout } from "redux/modules/authSilce";

function Detail() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { isLoding, error, letters } = useSelector((state) => state.letter);
  let { id } = useParams();

  const avatar = letters.avatar;

  useEffect(() => {
    const checkMemberInformation = async () => {
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
      } catch (error) {
        alert("토큰이 만료되었습니다. 잠시 후에 로그아웃됩니다.");
        dispatch(logout());
      }
    };
    checkMemberInformation();
  }, [auth.accessToken, dispatch]);

  useEffect(() => {
    if (!isLoding) {
      setLetterDetail(letters);
    }
  }, [isLoding, letters]);
  const userId = auth.userId;
  const nickname = auth.nickname;

  const navigator = useNavigate();

  //뒤로 가기
  const clickHome = () => {
    navigator(-1);
  };

  // 필터링 된 팬레터
  const [letterDetail, setLetterDetail] = useState(letters);

  // 팬레터들 중 하나 필터링
  const filterLetter = letterDetail?.filter((L) => {
    return L.id === id;
  });

  // console.log(filterLetter);

  // 삭제 기능(확인 메세지-> 삭제 후 홈화면 이동)
  const letterDelHandler = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      dispatch(__deleteLetter(id));
      navigator(-1);
    }
  };
  // 수정 기능
  const [editClicked, setEditClicked] = useState(false);
  const [editContent, setEditContent] = useState(filterLetter[0]?.content);
  // console.log(editContent);

  // 누르면 textarea 나오게
  const clickedTextArea = () => {
    setEditClicked(true);
  };

  // textarea onChange
  const onChangeEdit = (e) => {
    setEditContent(e.target.value);
  };
  //완료 누르면 적용
  const submitEditContent = () => {
    if (filterLetter[0].content === editContent) {
      alert("수정된 부분이 없습니다.");
      setEditClicked(true);
      return false;
    }

    dispatch(__editLetter({ id: id, letter: editContent }));
    // dispatch(editLetter(letter));
    navigator(-1);
  };

  if (isLoding) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    // 삼항연산자 사용 true면 textarea나오고 완료버튼 나오게, false면 수정, 삭제버튼 나오게
    <>
      <StHeight>
        {editClicked
          ? filterLetter.map((letter) => {
              return (
                <div key={letter.id} id={letter.id}>
                  <div>
                    <Button
                      eventHandler={clickHome}
                      $margin="50px 0px 0px 50px"
                    >
                      HOME
                    </Button>
                  </div>
                  <LetterContainer>
                    <LetterImgName>
                      <StImg width="100px" src={letter.avatar} />
                      <NicknName>
                        {userId === letter.userId ? nickname : letter.nickname}
                      </NicknName>
                    </LetterImgName>
                    <StWritedTo>TO : {letter.writedTo}</StWritedTo>
                    <div>
                      <Textarea
                        rows={4}
                        value={editContent}
                        onChange={onChangeEdit}
                      />
                    </div>
                    <DateButton>
                      <p>{letter.createdAt}</p>
                      <div>
                        <Button eventHandler={submitEditContent}>완료</Button>
                      </div>
                    </DateButton>
                  </LetterContainer>
                </div>
              );
            })
          : filterLetter.map((letter) => {
              console.log(letter);
              return (
                <div key={letter.id} id={letter.id}>
                  <div>
                    <Button
                      $margin="50px 0px 0px 50px"
                      eventHandler={clickHome}
                    >
                      HOME
                    </Button>
                  </div>
                  <LetterContainer>
                    <LetterImgName>
                      <StImg width="100px" src={letter.avatar} />
                      <NicknName>
                        {userId === letter.userId ? nickname : letter.nickname}
                      </NicknName>
                    </LetterImgName>
                    <StWritedTo>TO : {letter.writedTo}</StWritedTo>
                    <div>
                      <StContent>{letter.content}</StContent>
                    </div>
                    <DateButton>
                      <p>{letter.createdAt}</p>
                      <div>
                        {userId === letter.userId ? (
                          <>
                            <Button
                              $margin="6px"
                              eventHandler={clickedTextArea}
                            >
                              수정
                            </Button>
                            <Button
                              $margin="6px"
                              eventHandler={() => {
                                letterDelHandler(letter.id);
                              }}
                            >
                              삭제
                            </Button>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </DateButton>
                  </LetterContainer>
                </div>
              );
            })}
      </StHeight>
    </>
  );
}

const StImg = styled.img`
  border-radius: 100%;
`;

const LetterImgName = styled.div`
  display: flex;
  align-items: center;

  font-weight: bold;
`;
const NicknName = styled.p`
  margin-left: 10px;
`;

const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(315deg, #eee29f76, #9adbe87e, #f4a6d77a);
  border-radius: 20px;

  padding: 30px;
  margin: 160px 50px;

  font-size: large;
`;

const StWritedTo = styled.p`
  margin: 10px 0px;

  font-weight: bold;
`;

const StContent = styled.p`
  background: linear-gradient(315deg, #eee29f76, #9adbe87e, #f4a6d77a);
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;

const DateButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  background: linear-gradient(315deg, #eee29f76, #9adbe87e, #f4a6d77a);
  border: none;
  resize: none;
  outline: none;

  font-size: large;
`;

const StHeight = styled.div`
  height: 100vh;
`;
export default Detail;
