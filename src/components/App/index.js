import React, { Component } from 'react';
import DrawingCanvas from '../DrawingCanvas/index';

import './style.css';

class App extends Component {
  componentDidMount() {
    console.log(this.props.match.params);
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="container">
            <h1 className="text-white text-center">Gartic</h1>
          </div>
        </div>
        <div className="chat">
          <div className="container">
            <div className="row">
              <div className="sidebar col-4">
                <div className="user">
                  <img src="https://semantic-ui.com/images/avatar2/large/matthew.png" alt="Lucas Müller" className="user-img" />
                  <div className="user-info">
                    <h4 className="text-white m-0">Lucas Müller</h4>
                    <h6 className="text-white m-0">Desenvolvedor</h6>
                  </div>
                </div>
                <div className="conversations">
                  
                </div>
              </div>
              <div className="content col">
                <DrawingCanvas />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
