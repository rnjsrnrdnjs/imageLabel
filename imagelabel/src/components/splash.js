import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import serverURL from "../serverURL";

export default function Splash({ updateLoggedIn, loginState }) {
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "300px",
          border: "1px solid #828282",
          padding: "10px",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "bold" }}
        >
          사용자 로그인
        </div>
        <div style={{ marginBottom: "10px", fontSize: "18px" }}>
          <div>사용자 ID </div>
          <input
            style={{
              marginLeft: "5px",
              height: "20px",
            }}
            value={loginID}
            onChange={(e) => {
              setLoginID(e.target.value);
            }}
          />
        </div>
        <div style={{ marginBottom: "10px", fontSize: "18px" }}>
          <div>비밀번호 </div>
          <input
            style={{
              marginLeft: "5px",
              height: "20px",
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div
          style={{
            fontSize: "18px",
            border: "1px solid #828282",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={async () => {
            console.log(1);
            await axios
              .post(`${serverURL}/tokenCheck`, {
                loginID,
                password,
              })
              .then((res) => {
                if (res.data.status === "true") {
                  updateLoggedIn();
                  navigate("Main");
                }
              });
          }}
        >
          로그인
        </div>
      </div>
    </div>
  );
}
