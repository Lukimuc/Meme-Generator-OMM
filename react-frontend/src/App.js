import React, { Component } from 'react';
import Signin from './Pages/Signin/Signin';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';

import Navigation from './Components/navigation'


class App extends Component {
  constructor() {
    super();
    this.state = {
      // initial state attributes
      route: 'signin', // keeps track on where we are on the page 
      isSignedIn: false,
      user: { // user with sub-attributes has to be updated by database
        id: '',
        name: '',
        email: '',
        joined: '',
      }
    }
  }

 


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, route } = this.state; // to avoid this.state.isSigendIn und .state and make more readable code
    return (
      <>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {/* If then Statements, ? is executed if true,: is executed if false 
        => If route === 'something' then show these components */}
        {route === 'home'
          ? <Home onRouteChange={this.onRouteChange} />
          : (route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />)
        }
      </>
    );
  }
}

export default App;
