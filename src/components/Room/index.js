import React, { Component } from 'react';
import DrawingCanvas from '../DrawingCanvas';

import './style.css';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      usuario: window.user,
      draw: undefined,
      canDraw: undefined,
      ready: undefined,
      palavra: ''
    };
  }

  componentDidMount() {
    if(!this.state.usuario)
      this.props.history.push('/');

    window.socket.on('room:users', (usuarios) => this.setState({ usuarios }));

    window.socket.on('draw', (update) => this.setState({
      ...update,
      ready: true
    }));
    
    window.socket.on('draw:word', ({palavra}) => this.setState({
      palavra: palavra ? `Desenhe: ${palavra}` : ''
    }));

    window.socket.on('room:end', (usuarios) => {
      window.winner = usuarios.sort((a, b) => b.pontuacao - a.pontuacao)[0];
      this.props.history.push('/room/end');
    })
  }

  componentDidUpdate({ canDraw }) {
    if(canDraw && this.state.canDraw 
      && canDraw.id !== this.state.canDraw.id)
      this.setState({palavra: ''});
  }

  sendDraw(draw) {
    window.socket.emit('draw', { drawUpdate: draw });
  }

  sendOpinion(event) {
    event.preventDefault();

    window.socket.emit('draw:opinion', { opinion: this.state.palavra });
    this.setState({palavra: ''});
  }

  render() {
    return (
      <div className="room row">
        {this.state.ready &&
          <div className="sidebar col-4">
            <div className="users">
              {this.state.usuarios.sort((a, b) => b.pontuacao - a.pontuacao)
                .map((user, i) =>  <div key={i} className="user">
                  <h3 className="text-white mr-3">{i + 1}º</h3>
                  <div className="user-info">
                    <h4 className="text-white m-0">{user.nome}</h4>
                    <h6 className="text-white m-0">{user.pontuacao} ponto(s)</h6>
                  </div>
                </div>
              )}
            </div>
            <div className="conversations">
              <form onSubmit={this.sendOpinion.bind(this)}>
                <div className="form-group">
                  <input id="nome" type="text" 
                    value={this.state.palavra} 
                    onChange={(e) => this.setState({palavra: e.target.value})}
                    placeholder={`O que ${this.state.canDraw.nome} está desenhando?`} 
                    disabled={this.state.usuario.id === this.state.canDraw.id} 
                    className="form-control" autoFocus autoComplete="off"/>
                </div>
              </form>
            </div>
          </div> }
        {this.state.ready &&
          <div className="content col">
            {this.state.usuario.id === this.state.canDraw.id &&
              <DrawingCanvas draw={this.state.draw} canDraw={true} onDraw={this.sendDraw} /> }
            
            {this.state.usuario.id !== this.state.canDraw.id &&
              <DrawingCanvas draw={this.state.draw} /> }
          </div> }
      </div>
    );
  }
}

export default Room;
