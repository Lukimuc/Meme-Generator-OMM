import React, { Component } from 'react';
import Signin from './pages/Signin/Signin';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Rank from './Components/rank';
import Navigation from './Components/navigation';
import Profile from './pages/Profile/profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Singleview } from './pages/Singleview/singleview';
import Editor from './pages/Editor/editor';
import New_Editor from './pages/NewEditor/new_editor';
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
      }
    }
  }

  // load individual user data  
  loadUser = (data) => {

    console.log("load User executed", data)
    this.setState({
      isSignedIn: true, // if there is a ID, set isSignedIn to true
      user: {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        joined: data.joined,
        entries: data.entries,
      }
    })
  }



  // Used for navigation and to check if user is logged in or not //


  render() {
    const { isSignedIn, user } = this.state; // to avoid this.state.isSigendIn und .state and make more readable code
    return (
      <>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
        <BrowserRouter>
          <Navigation isSignedIn={isSignedIn} />

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
            <Route path='/profile/' element={<Profile isSignedIn={isSignedIn} user={user} />} />
            <Route path='/memes/:id' element={<Singleview />} />
            <Route path='/editor' element={<Editor />} />
            <Route path='/testLukas' element={<TestLukas />} />

          </Routes>
        </BrowserRouter>
      </>
    );
  }


}

export default App;


  // ------   render components  backup ----- // 
  // render() {
  //   const { isSignedIn, route } = this.state; // to avoid this.state.isSigendIn und .state and make more readable code
  //   return (
  //     <>
  //       <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
  //       <Rank firstname={this.state.user.firstname} entries={this.state.user.entries} />
  //       <Profile onRouteChange={this.onRouteChange}></Profile>
  //       {/* If then Statements, ? is executed if true,: is executed if false
  //       => If route === 'something' then show these components */}
  //      {/*  {route === 'home'
  //         ? <Home onRouteChange={this.onRouteChange} />
  //         : (route === 'signin'
  //           ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
  //           : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
  //       } */}
  //     </>
  //   );
  // }