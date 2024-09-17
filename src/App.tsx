import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { request, setAuthHeader } from './helpers/axios_helper.ts';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Search from './components/Search'
import { useState } from "react";
import Dashboard from "./components/Dashboard.tsx";
import { Toaster } from "react-hot-toast";

function App() {

  const [login, setLogin] = useState(false);

  const logout = () => {
    setAuthHeader(null);
    setLogin(false);
  };

  const handleLogin = (token: string) => {
    setAuthHeader(token);
    setLogin(true);
  }


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
          handleLogin(response.data.token);
        }).catch(
          (error) => {
            logout();
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
          handleLogin(response.data.token);
        }).catch(
          (error) => {
            logout();
          }
        );
  };
  return (
    <BrowserRouter>
      <Navbar
        login={login}
        logout={logout}
      />
      <Toaster />
      <Routes>
        <Route element={<Search login={login} />} path="/" />
        {login &&
          <Route element={<Dashboard login={login} />} path="/dashboard" />
        }
        <Route element={<Login onLogin={onLogin} onRegister={onRegister} />} path="/login" />
      </Routes>

    </BrowserRouter>
  )
}

export default App
