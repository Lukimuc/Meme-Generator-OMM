import logo from './logo.svg';
import './App.css';
import React from "react"

import { BrowserRouter as Router, Routes,  Route} from 'react-router-dom'

import Account from "./pages/Account/account"
import Editor from "./pages/Editor/editor"
import Login from "./pages/Login/login"
import Singleview from "./pages/Singleview/singleview"
import Overview from "./pages/Overview/overview"

function App() {
  return (
  /*   <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/editor" element={<Editor/>} />
        <Route path="/singleview" element={<Singleview/>} />
        <Route path="/overview" element={<Overview/>} />
      </Routes>
    </Router> */
  
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    
  );
}

export default App;
