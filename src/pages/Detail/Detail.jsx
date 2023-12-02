import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __deleteLetter, __editLetter } from "redux/modules/letter";
import Button from "components/Button/Button";
import axios from "axios";
import { logout } from "redux/modules/authSilce";
import {
  DateButton,
  LetterContainer,
  LetterImgName,
  NicknName,
  StContent,
  StHeight,
  StImg,
  StWritedTo,
  Textarea,
} from "./styles";

function Detail() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let { id } = useParams();

  // 필터링 된 팬레터

  // 팬레터들 중 하나 필터링
  const { isLoding, error, letters } = useSelector((state) => state.letter);
  const [letterDetail, setLetterDetail] = useState(letters);
  const filterLetter = letterDetail?.filter((L) => {
    return L.id === id;
  });
  const [editClicked, setEditClicked] = useState(false);
  const [editContent, setEditContent] = useState(filterLetter[0]?.content);

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

  const navigator = useNavigate();

  //뒤로 가기
  const clickHome = () => {
    navigator("/");
  };

  // 삭제 기능(확인 메세지-> 삭제 후 홈화면 이동)
  const letterDelHandler = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      dispatch(__deleteLetter(id));
      navigator(-1);
    }
  };
  // 수정 기능

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
    alert("수정이 완료되었습니다😀");
    dispatch(__editLetter({ id: id, letter: editContent }));
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
                      <NicknName>{letter.nickname}</NicknName>
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
                      <NicknName>{letter.nickname}</NicknName>
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

export default Detail;
