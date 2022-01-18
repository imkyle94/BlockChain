import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <h1>프로젝트 뿅</h1>
        <Link to="/1blocks">블럭보기</Link> |{" "}
        <Link to="/1expenses">그냥 만들어봄</Link>
        <br></br>
        <Link to="/join">회원가입</Link> | <Link to="/login">로그인</Link>
        <br></br>
        <Link to="/apis">Apis</Link>
      </nav>
    </div>
  );
}

export default App;
