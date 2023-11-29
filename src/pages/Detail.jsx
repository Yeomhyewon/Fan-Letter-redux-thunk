import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteLetter, editLetter } from "redux/modules/letter";
import Button from "components/Button";
import styled from "styled-components";

function Detail() {
  const letter = useSelector((state) => {
    return state.letter;
  });

  const dispatch = useDispatch();

  const navColor = useLocation();
  const color = navColor.state;

  let { id } = useParams();
  const navigator = useNavigate();

  //뒤로 가기
  const clickHome = () => {
    navigator(-1);
  };

  // 팬레터들 중 하나 필터링
  const filterLetter = letter.filter((L) => {
    return L.id === id;
  });

  // 필터링 된 팬레터
  const [letterDetail] = useState(filterLetter);

  // 삭제 기능(확인 메세지-> 삭제 후 홈화면 이동)
  const letterDelHandler = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      dispatch(deleteLetter(id));
      navigator(-1);
    }
  };
  // 수정 기능
  const [editClicked, setEditClicked] = useState(false);
  const [editContent, setEditContent] = useState(filterLetter[0]?.content);

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
    const letter = {
      ...letterDetail[0],
      content: editContent,
    };
    dispatch(editLetter(letter));
    navigator(-1);
  };

  return (
    // 삼항연산자 사용 true면 textarea나오고 완료버튼 나오게, false면 수정, 삭제버튼 나오게
    <>
      <div>
        {editClicked
          ? letterDetail.map((letter) => {
              return (
                <div key={letter.id} id={letter.id}>
                  <div>
                    <Button
                      eventHandler={clickHome}
                      $margin="50px 0px 0px 50px"
                      $btn={color}
                    >
                      HOME
                    </Button>
                  </div>
                  <LetterContainer $bordercolor={color}>
                    <LetterImgName>
                      <StImg width="100px" src={letter.avatar} />
                      <NicknName>{letter.userNickname}</NicknName>
                    </LetterImgName>
                    <StWritedTo>TO : {letter.writedTo}</StWritedTo>
                    <div>
                      <Textarea
                        $bgcolor={color}
                        rows={4}
                        value={editContent}
                        onChange={onChangeEdit}
                      />
                    </div>
                    <DateButton>
                      <p>{letter.createdAt}</p>
                      <div>
                        <Button $btn={color} eventHandler={submitEditContent}>
                          완료
                        </Button>
                      </div>
                    </DateButton>
                  </LetterContainer>
                </div>
              );
            })
          : letterDetail.map((letter) => {
              return (
                <div key={letter.id} id={letter.id}>
                  <div>
                    <Button
                      $btn={color}
                      $margin="50px 0px 0px 50px"
                      eventHandler={clickHome}
                    >
                      HOME
                    </Button>
                  </div>
                  <LetterContainer $bordercolor={color}>
                    <LetterImgName>
                      <StImg width="100px" src={letter.avatar} />
                      <NicknName>{letter.userNickname}</NicknName>
                    </LetterImgName>
                    <StWritedTo>TO : {letter.writedTo}</StWritedTo>
                    <div>
                      <StContent $bgcolor={color}>{letter.content}</StContent>
                    </div>
                    <DateButton>
                      <p>{letter.createdAt}</p>
                      <div>
                        <Button
                          $btn={color}
                          $margin="6px"
                          eventHandler={clickedTextArea}
                        >
                          수정
                        </Button>
                        <Button
                          $btn={color}
                          $margin="6px"
                          eventHandler={() => {
                            letterDelHandler(letter.id);
                          }}
                        >
                          삭제
                        </Button>
                      </div>
                    </DateButton>
                  </LetterContainer>
                </div>
              );
            })}
      </div>
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

  border: 3px solid ${(props) => props.$bordercolor};
  border-radius: 20px;

  padding: 30px;
  margin: 160px 50px;

  font-size: large;
`;

const StWritedTo = styled.p`
  margin: 10px 92% 4px 0px;

  font-weight: bold;
`;

const StContent = styled.p`
  background-color: ${(props) => props.$bgcolor};
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
  background-color: ${(props) => props.$bgcolor};
  border: none;
  resize: none;
  outline: none;

  font-size: large;
  font-family: "omyu_pretty";
`;
export default Detail;
