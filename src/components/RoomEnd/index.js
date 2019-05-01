import React, { Component } from 'react';

import './style.css';

class RoomEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: window.winner
    };
  }

  render() {
    return (
      <div className="room-end row h-100 align-items-center text-white">
        <div className="content col">
          <h1 className="text-center">Jogo finalizado!</h1>
          <h3 className="text-center">Quem ganhou foi {this.state.winner.nome} com {this.state.winner.pontuacao}</h3>
        </div>
      </div>
    );
  }
}

export default RoomEnd;