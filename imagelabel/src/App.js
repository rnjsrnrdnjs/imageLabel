import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Splash from "./components/splash";
import Main from "./components/main";

function App() {
  const [loginState, setLoginState] = useState(false);
  const updateLoggedIn = () => {
    setLoginState(true);
  };
  return (
    <div className="ALL">
      <Routes>
        <Route
          path="/"
          element={
            <Splash loginState={loginState} updateLoggedIn={updateLoggedIn} />
          }
          exact={true}
        />
        <Route
          path="/Main"
          element={
            <Main loginState={loginState} updateLoggedIn={updateLoggedIn} />
          }
          exact={true}
        />
      </Routes>
    </div>
  );
}

export default App;
