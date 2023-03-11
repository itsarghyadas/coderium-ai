import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Homepage";
import LoginForm from "./pages/LoginForm";
import Register from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard";
import ChatApp from "./chatgpt-v2/ChatApp";
import Pricing from "./pages/Pricing";
import Completion from "./pages/Completion";

// auth middleware
import { AuthorizeUser } from "./middleware/auth";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        theme="dark"
        transition={Slide}
        closeOnClick
        pauseOnHover
        limit={1}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <AuthorizeUser>
                <Dashboard />
              </AuthorizeUser>
            }
          />
          <Route
            path="/chat"
            element={
              <AuthorizeUser>
                <ChatApp />
              </AuthorizeUser>
            }
          />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
