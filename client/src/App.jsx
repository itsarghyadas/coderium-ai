import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Homepage";
import LoginForm from "./pages/LoginForm";
import Register from "./pages/RegisterForm";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        theme="colored"
        transition={Slide}
        closeOnClick
        draggable
        pauseOnHover
        limit={1}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
