import logo from './logo.svg';
import React, { useEffect, useState, Component } from "react";
import './App.css';
import { BrowserRouter as Router, Routes,  Route} from 'react-router-dom'
import { AppBar } from '@mui/material'
import Account from "./pages/Account/account"
import Card from "./pages/Card/card"
import Editor from "./pages/Editor/editor"
import Login from "./pages/Login/login"
import Singleview from "./pages/Singleview/singleview"
import Overview from "./pages/Overview/overview"
import MenuAppBar from "./pages/AppBar/appbar"

function App() {

return (  
  <div>
     <Router>
  <MenuAppBar/>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/account" element={<Account/>} />
      <Route path="/editor" element={<Editor/>} />
      <Route path="/singleview" element={<Singleview/>} />
      <Route path="/overview" element={<Overview/>} />
      <Route path="/appbar" element={<AppBar/>} />
      <Route path="/card" element={<Card/>} />
    </Routes>
  </Router>
    </div>

);

}

export default App;