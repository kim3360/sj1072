import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Library from './chapter_03/Library';
import Clock from './chapter_04/Clock';
import CommentList from './chapter_05/CommentList';

const root = ReactDOM.createRoot(document.getElementById('root'));
// setInterval(() => {
//   root.render(
//     <React.StrictMode>
//       {/* <App /> */}
//       {/* <Library /> */}
//       <Clock />
//     </React.StrictMode>
//   );
// }, 1000);

root.render(
      <React.StrictMode>
       <CommentList/>
      </React.StrictMode>
    );



