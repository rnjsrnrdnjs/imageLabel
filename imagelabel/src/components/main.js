import { useState, useEffect, useRef, ProgressBar } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ReactSlider from "react-slider";
import axios from "axios";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Main({ updateLogedIn, loginState }) {
  const navigate = useNavigate();
  const [frameList, setFrameList] = useState(null);
  const frameRef = useRef(null);
  const frameWidthRef = useRef(null);
  const selectRef = useRef(null);
  useEffect(() => {
    if (loginState === false) navigate("/");
    async function fetchData() {
      await axios.post(`http://localhost:5000/getLabelList`).then((res) => {
        console.log(res.data);
        setFrameList(res.data);
        setSelectList([]);
      });
    }
    fetchData();
  }, []);

  const [delay, setDelay] = useState(null);
  const [now, setNow] = useState(0);
  const [selectList, setSelectList] = useState([]);
  const [playChk, setPlayChk] = useState(false);

  useInterval(
    () => {
      setNow(now + 1);
      //console.log(now);
    },
    frameList !== null && now < frameList.list.Labels.length - 1 ? delay : null
  );
  useEffect(() => {
    if (frameList === null || frameRef === null || frameWidthRef === null)
      return;
    console.log(frameWidthRef.current.offsetWidth);
    frameRef.current.scrollTo(frameWidthRef.current.offsetWidth * now, 0);
    //frameRef.current.scrollIntoView(100, 100);
    //console.log(e.target.scrollTo(500, 500));

    //console.log(frameRef.current);
  }, [now, frameRef, frameWidthRef]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginTop: "10px",
          justifyContent: "flex-end",
          width: "100vw",
          marginRight: "10vw",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "10px",
            border: "1px solid #828282",
            cursor: "pointer",
          }}
          onClick={async () => {
            if (frameList === null) return;
            await axios
              .post(`http://localhost:5000/selectLabel`, {
                selectList: selectList,
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.status === "false")
                  window.alert("프레임을 선택해주세요.");
                else if (res.data.status === "true") {
                  window.alert("선택 프레임이 제출되었습니다.");
                }
                setSelectList([]);
              });
          }}
        >
          제출
        </div>
        <div
          style={{
            marginLeft: "10px",
            fontSize: "30px",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "10px",
            border: "1px solid #828282",
            cursor: "pointer",
          }}
          onClick={async () => {
            if (frameList === null) return;
            setSelectList([]);
            await axios
              .post(`http://localhost:5000/newLabelList`, {
                prevId: frameList.list.id,
              })
              .then((res) => {
                console.log(res.data);
                setFrameList(res.data);
              });
          }}
        >
          다른프레임
        </div>
      </div>
      {frameList !== null && (
        <div style={{ marginTop: "10px", maxWidth: "80vw", maxHeight: "40vh" }}>
          <img
            src={`http://localhost:5000/outputs/${frameList.list.name}/${frameList.list.Labels[now].name}`}
            style={{ maxWidth: "80vw", maxHeight: "40vh" }}
          />
        </div>
      )}

      {frameList !== null && (
        <input
          type="range"
          value={now}
          style={{ width: "80vw", height: "20px" }}
          max={frameList.list.Labels.length - 1}
          min={0}
          onChange={(e) => {
            setNow(parseInt(e.target.value));
          }}
        />
      )}

      <div
        ref={frameRef}
        style={{
          marginTop: "10px",
          overflow: "scroll",
          overflowY: "hidden",
          maxWidth: "80vw",
          maxHeight: "20vh",
        }}
      >
        <div style={{}}></div>
        {frameList !== null &&
          frameList.list.Labels.map((list, idx) => (
            <div
              ref={frameWidthRef}
              style={
                now !== idx
                  ? {
                      maxWidth: "20vh",
                      maxHeight: "20vh",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }
                  : {
                      border: "3px solid #828282",
                      maxWidth: "20vh",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      maxHeight: "20vh",
                    }
              }
            >
              {/*<div>{list.select === true && "123"}</div>*/}
              <img
                src={`http://localhost:5000/outputs/${frameList.list.name}/${list.name}`}
                style={
                  list.select === true
                    ? {
                        boxSizing: "border-box",
                        border: "1px solid green",
                        borderRadius: "50vh",
                        maxWidth: "20vh",
                        maxHeight: "20vh",
                      }
                    : {
                        maxWidth: "20vh",
                        maxHeight: "20vh",
                      }
                }
              />
            </div>
          ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            marginRight: "10px",
            borderRadius: "10px",
            border: "1px solid #828282",
            padding: "10px",
          }}
          onClick={() => {
            if (frameList === null) return;
            setDelay(null);
            setPlayChk(false);
            if (now >= 1) setNow(now - 1);
          }}
        >
          이전 프레임
        </div>
        <div
          style={{
            marginRight: "10px",
            borderRadius: "10px",
            border: "1px solid #828282",
            padding: "10px",
          }}
          onClick={() => {
            if (frameList === null) return;
            if (playChk === false) {
              setPlayChk(true);
              setDelay(null);
              setDelay(50);
            } else {
              setPlayChk(false);
              setDelay(null);
            }
          }}
        >
          {playChk === false ? "재생" : "멈춤"}
        </div>
        <div
          style={{
            marginRight: "10px",
            borderRadius: "10px",
            border: "1px solid #828282",
            padding: "10px",
          }}
          onClick={() => {
            if (frameList === null) return;
            setDelay(null);
            setPlayChk(false);
            if (frameList.list.Labels.length - 1 > now) setNow(now + 1);
          }}
        >
          다음프레임
        </div>
        <div
          style={{
            marginRight: "10px",
            borderRadius: "10px",
            border: "1px solid #828282",
            padding: "10px",
          }}
          onClick={() => {
            setDelay(null);
            setPlayChk(false);

            if (frameList.list.Labels[now].select === false) {
              if (selectList.length <= 9) {
                setSelectList(selectList.concat(frameList.list.Labels[now]));
                frameList.list.Labels[now].select = true;
              } else window.alert("프레임은 최대 10개까지 고를수 있습니다.");
            } else if (frameList.list.Labels[now].select === true) {
              setSelectList(
                selectList.filter(
                  (val, idx) => val.id !== frameList.list.Labels[now].id
                )
              );
              frameList.list.Labels[now].select = false;
            }
          }}
        >
          선택
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
          overflow: "scroll",
          overflowY: "hidden",
          maxWidth: "80vw",
          maxHeight: "20vh",
        }}
      >
        {selectList.map((list, idx) => (
          <div
            style={{
              order: list.id,
            }}
          >
            <img
              src={`http://localhost:5000/outputs/${frameList.list.name}/${list.name}`}
              style={{
                maxWidth: "20vh",
                maxHeight: "20vh",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
