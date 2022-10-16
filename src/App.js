import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./login/Login";
import Chat from "./chat/Chat";
import Register from "./register/Register";

function App() {
  return (
      <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/chat" element={<Chat/>} />
              </Routes>
      </BrowserRouter>
  );
}

export default App;