import React, { Component } from 'react';
import Signin from './pages/Signin/Signin';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Navigation from './Components/navigation';
import Profile from './pages/Profile/profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Singleview } from './pages/Singleview/singleview';
import Editor from './pages/Editor/editor';
import TestLukas from './pages/TestLukas/TestLukas';


class App extends Component {
  constructor() {
    super();
    this.state = {
      // initial state attributes
      isSignedIn: false,
      user: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        joined: '',
        entries: 0,
      }, isOnline: true
    }
  }

  // load individual user data  
  loadUser = (data) => {

    console.log("load User executed", data)
    this.setState({
      isSignedIn: true, // if there is a ID, set isSignedIn to true
      user: {
        id: data._id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        userCreated: data.userCreated,
        entries: data.entries,
      }
    })
  }



  // Used for navigation and to check if user is logged in or not //


  render() {
    const { isSignedIn, user } = this.state; // to avoid this.state.isSigendIn und .state and make more readable code
    return (
      <>
      <div>
        {!this.state.isOnline && <div>You are currently offline</div>}
      </div>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
        <BrowserRouter>
          <Navigation isSignedIn={isSignedIn} user={user}/>

          <Routes>

            <Route path="/" element={
              <Home />
            } />
            <Route path='/signin' element={
              <Signin loadUser={this.loadUser} />
            } />
            <Route path='/register' element={
              <Register loadUser={this.loadUser} />
            } />
            <Route path='/profile/:id' element={<Profile isSignedIn={isSignedIn} user={user} />} />
            <Route path='/memes/:id' element={<Singleview />} />
            <Route path='/editor' element={<Editor />} />
            <Route path='/testLukas' element={<TestLukas user={user}/>} />

          </Routes>
        </BrowserRouter>
      </>
    );
  }


  // ------- Feature 21 Basic -  Offline Capabilities ------ //
  componentDidMount() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ isOnline: true });
  }

  handleOffline = () => {
    this.setState({ isOnline: false });
  }

  // ------- Feature 21 Basic - End ------ //

}

export default App;