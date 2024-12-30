import React from "react";
import { createRoot } from "react-dom/client";

// Clock 컴포넌트 정의
const Clock = () => {
  return (
    <div>
      <h1>안녕, 리액트!</h1>
      <h2>현재 시간: {new Date().toLocaleTimeString()}</h2>
    </div>
  );
};

// root 생성
const container = document.getElementById("root");
const root = createRoot(container); // createRoot로 root 생성

// 1초마다 Clock 렌더링
// setInterval(() => {
//   root.render(
//     <React.StrictMode>
//       <Clock />
//     </React.StrictMode>
//   );
// }, 1000);

export default Clock;
