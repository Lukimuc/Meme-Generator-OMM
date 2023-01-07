import React, { Component } from 'react';
import Signin from './Pages/Signin/Signin';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import Rank from './Components/rank'
import Navigation from './Components/navigation'



class App extends Component {
  constructor() {
    super();
    this.state = {
      // initial state attributes
      input: "",
      imageURL: "",
      box: {},
      route: 'signin', // keeps track on where we are on the page 
      isSignedIn: false,
      user: {
        id: '',
        name: '',
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
        name: data.name,
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
  render() {
    const { isSignedIn, route } = this.state; // to avoid this.state.isSigendIn und .state and make more readable code
    return (
      <>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <button
          onClick={this.onCount}
        >Count</button>
        {/* If then Statements, ? is executed if true,: is executed if false 
        => If route === 'something' then show these components */}
        {route === 'home'
          ? <Home onRouteChange={this.onRouteChange} />
          : (route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
        }
      </>
    );
  }
}

export default App;
