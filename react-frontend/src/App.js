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
import New_Editor from './pages/NewEditor/new_editor'


class App extends Component {
  constructor() {
    super();
    this.state = {
      // initial state attributes
      input: "",
      imageURL: "",
      box: {},
      route: 'login', // keeps track on where we are on the page 
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
    this.setState({
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

  // function who get entries and updates the textfield 
  onCount = () => {
    fetch('http://localhost:3001/image', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries: count }))
      })
  }

isSignedIn = (props) => {

}


  // Used for navigation and to check if user is logged in or not //
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  // ------   render components   ----- // 
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

  render() {
    const { isSignedIn, route } = this.state; // to avoid this.state.isSigendIn und .state and make more readable code
    return (
      <>
        <BrowserRouter>
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          <Rank firstname={this.state.user.firstname} entries={this.state.user.entries} />
          <Routes>

            <Route path="/" element={
              <Home onRouteChange={this.onRouteChange} />
            } />
            <Route path='/signin' element={
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            } />
            <Route path='/register' element={
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            } />
            <Route path='/profile/' element={<Profile />} />
            <Route path='/memes/:id' element={<Singleview />} />
            <Route path='/editor' element={<Editor />} />
            <Route path='/editorNew' element={<New_Editor />} />

            {/*  <Route path="/home">
              <Home onRouteChange={this.onRouteChange} />
            </Route>
            <Route path="/signin">
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </Route>
            <Route path="/register">
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </Route>
            <Route path="/profile">
              <Profile onRouteChange={this.onRouteChange}></Profile>
            </Route> */}

          </Routes>
        </BrowserRouter>
      </>
    );
  }


}

export default App;