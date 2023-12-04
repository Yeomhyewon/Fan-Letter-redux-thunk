import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { __deleteLetter, __editLetter } from "redux/modules/letter";
import Button from "components/Button/Button";
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
import { serverInstance } from "api/apiServer";

function Detail() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let { id } = useParams();

  // 필터링 된 팬레터

  // 팬레터들 중 하나 필터링
  const { isLoding, error, letters } = useSelector((state) => state.letter);
  const [letterDetail, setLetterDetail] = useState(letters);
  const selectedLetter = letterDetail?.find((L) => {
    return L.id === id;
  });
  const [editClicked, setEditClicked] = useState(false);
  const [editContent, setEditContent] = useState(selectedLetter.content);

  useEffect(() => {
    const checkMemberInformation = async () => {
      try {
        const response = await serverInstance.get(`/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
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
  const letterDeleteHandler = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      dispatch(__deleteLetter(id));
      navigator(-1);
    }
  };
  // 수정 기능

  // 누르면 textarea 나오게
  const clickedSwitchTextArea = () => {
    setEditClicked(true);
  };

  // textarea onChange
  const onChangeEdit = (e) => {
    setEditContent(e.target.value);
  };
  //완료 누르면 적용
  const submitEditContentHanlder = () => {
    if (selectedLetter.content === editContent) {
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
        {editClicked ? (
          <div key={selectedLetter.id} id={selectedLetter.id}>
            <div>
              <Button eventHandler={clickHome} $margin="50px 0px 0px 50px">
                HOME
              </Button>
            </div>
            <LetterContainer>
              <LetterImgName>
                <StImg width="100px" src={selectedLetter.avatar} />
                <NicknName>{selectedLetter.nickname}</NicknName>
              </LetterImgName>
              <StWritedTo>TO : {selectedLetter.writedTo}</StWritedTo>
              <div>
                <Textarea
                  rows={4}
                  value={editContent}
                  onChange={onChangeEdit}
                />
              </div>
              <DateButton>
                <p>
                  {
                    <time>
                      {new Date(selectedLetter.createdAt).toLocaleDateString(
                        "ko",
                        {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </time>
                  }
                </p>
                <div>
                  <Button eventHandler={submitEditContentHanlder}>완료</Button>
                </div>
              </DateButton>
            </LetterContainer>
          </div>
        ) : (
          <div key={selectedLetter.id} id={selectedLetter.id}>
            <div>
              <Button $margin="50px 0px 0px 50px" eventHandler={clickHome}>
                HOME
              </Button>
            </div>
            <LetterContainer>
              <LetterImgName>
                <StImg width="100px" src={selectedLetter.avatar} />
                <NicknName>{selectedLetter.nickname}</NicknName>
              </LetterImgName>
              <StWritedTo>TO : {selectedLetter.writedTo}</StWritedTo>
              <div>
                <StContent>{selectedLetter.content}</StContent>
              </div>
              <DateButton>
                <p>
                  <time>
                    {new Date(selectedLetter.createdAt).toLocaleDateString(
                      "ko",
                      {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </time>
                </p>
                <div>
                  {userId === selectedLetter.userId ? (
                    <>
                      <Button
                        $margin="6px"
                        eventHandler={clickedSwitchTextArea}
                      >
                        수정
                      </Button>
                      <Button
                        $margin="6px"
                        eventHandler={() => {
                          letterDeleteHandler(selectedLetter.id);
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
        )}
      </StHeight>
    </>
  );
}

export default Detail;
