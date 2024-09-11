import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { request, setAuthHeader } from './helpers/axios_helper.ts';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Search from './components/Search'
import { useState } from "react";
import Dashboard from "./components/Dashboard.tsx";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = (username: string, password: string) => {

    request(
      "POST",
      "/login",
      {},
      {
        login: username,
        password: password
      }).then(
        (response) => {
          setAuthHeader(response.data.token);
          setIsLoggedIn(true);
        }).catch(
          (error) => {
            setAuthHeader(null);
            setIsLoggedIn(false);
          }
        );
  };



  const onRegister = (firstName: string, lastName: string, username: string, password: string) => {

    request(
      "POST",
      "/register",
      {},
      {
        firstName: firstName,
        lastName: lastName,
        login: username,
        password: password
      }).then(
        (response) => {
          setAuthHeader(response.data.token);
          setIsLoggedIn(true);
        }).catch(
          (error) => {
            setAuthHeader(null);
            setIsLoggedIn(false);
          }
        );
  };
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route element={<Search />} path="/" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Login onLogin={onLogin} onRegister={onRegister} />} path="/login" />
      </Routes>

    </BrowserRouter>
  )
}

export default App
