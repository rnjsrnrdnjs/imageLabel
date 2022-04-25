import { useState, useEffect, useRef, ProgressBar } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ReactSlider from "react-slider";

const frameList = [
  {
    src: "/logo512.png",
  },
  {
    src: "/logo512.png",
  },
  {
    src: "/logo512.png",
  },
  {
    src: "/logo512.png",
  },
  {
    src: "/logo512.png",
  },
];

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
  useEffect(() => {
    if (loginState === false) navigate("/");
  }, []);

  const [delay, setDelay] = useState(null);
  const [now, setNow] = useState(0);
  const [selectList, setSelectList] = useState([]);
  const [playChk, setPlayChk] = useState(false);

  useInterval(
    () => {
      setNow(now + 1);
      console.log(now);
    },
    now < frameList.length - 1 ? delay : null
  );

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
        >
          {"<"}
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            borderRadius: "10px",
            padding: "10px",
            border: "1px solid #828282",
            cursor: "pointer",
          }}
        >
          {">"}
        </div>
      </div>
      <div style={{ marginTop: "10px", maxWidth: "80vw", maxHeight: "40vh" }}>
        <img
          src="/logo512.png"
          style={{ maxWidth: "80vw", maxHeight: "40vh" }}
        />
      </div>

      <input
        type="range"
        value={now}
        style={{ width: "80vw", height: "20px" }}
        max={frameList.length - 1}
        min={0}
        onChange={(e) => {
          setNow(parseInt(e.target.value));
        }}
      />

      <div
        style={{
          marginTop: "10px",
          overflow: "scroll",
          maxWidth: "80vw",
          maxHeight: "20vh",
        }}
      >
        {frameList.map((list, idx) => (
          <div
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
            <img
              src={list.src}
              style={{
                maxWidth: "20vh",
                maxHeight: "20vh",
              }}
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
            if (playChk === false) {
              setPlayChk(true);
              setDelay(null);
              setDelay(300);
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
            setDelay(null);
            setPlayChk(false);
            if (frameList.length - 1 > now) setNow(now + 1);
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
            setSelectList(selectList.concat(frameList[now]));
          }}
        >
          선택
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
          overflow: "scroll",
          maxWidth: "80vw",
          maxHeight: "20vh",
        }}
      >
        {selectList.map((list, idx) => (
          <div>
            <img
              src={list.src}
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
