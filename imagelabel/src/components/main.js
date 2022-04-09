import { useState, useEffect, useRef, ProgressBar } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

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

export default function Main({ updateLogedIn, loginState }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (loginState === false) navigate("/");
  }, []);

  let now = 0;
  const [selectList, setSelectList] = useState([]);

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
      <div style={{ marginTop: "10px", maxWidth: "80vw", maxHeight: "50vh" }}>
        <img
          src="/logo512.png"
          style={{ maxWidth: "80vw", maxHeight: "50vh" }}
        />
      </div>
      <div style={{ marginTop: "10px", width: "80vw" }}></div>
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
            style={{
              maxWidth: "20vh",
              maxHeight: "20vh",
            }}
          >
            <img src={list.src} />
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
        >
          재생
        </div>
        <div
          style={{
            marginRight: "10px",
            borderRadius: "10px",
            border: "1px solid #828282",
            padding: "10px",
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
        >
          선택
        </div>
      </div>
      <div>
        {selectList.map((list, idx) => (
          <div
            style={{
              maxWidth: "20vh",
              maxHeight: "20vh",
            }}
          >
            <img src={list.src} />
          </div>
        ))}
      </div>
    </div>
  );
}
