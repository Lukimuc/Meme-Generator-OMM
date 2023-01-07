import React, { Component } from 'react';
import Signin from './Pages/Signin/Signin';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import Button from '@mui/material/Button';

class App extends Component {
  constructor() {
    super();
    this.state ={
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
    this.setState({route: route});
  }

  render() {
    return (
      <>
        {/* todo Navigation einfügen */}
        <Button variant="contained">Hello World</Button>
        { this.state.route === 'home'
        ? <Home onRouteChange={this.onRouteChange}/>
        : (this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange}/> 
            : <Register onRouteChange={this.onRouteChange}/>)
        }
      </>
    );
}
}

export default App;
