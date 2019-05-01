import io from 'socket.io-client';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Room from '../Room';
import RoomEnd from '../RoomEnd';
import JoinRoom from '../JoinRoom';

import './style.css';

class App extends Component {
  componentWillMount() {
    window.socket = io.connect('http://localhost:8080');
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="header">
            <div className="container">
              <h1 className="text-white text-center">Gartic</h1>
            </div>
          </div>
          <div className="main">
            <div className="container">
              <Route path="/" exact={true} component={JoinRoom} />
              <Route path="/room" exact={true} component={Room} />
              <Route path="/room/end" exact={true} component={RoomEnd} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
