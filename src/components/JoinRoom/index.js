import React, { Component } from 'react';

class JoinRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  joinRoom(event) {
    event.preventDefault();

    window.socket.on('user:connected', (user) => {
      window.user = user;
      this.props.history.push('/room');
    });

    window.socket.emit('user:join', { name: this.state.name });
  }

  render() {
    return (
      <div className="join-room row h-100 align-items-center text-white">
        <div className="col-4 offset-4">
          <h1 className="text-center">Bem-vindo!</h1>
          <p>Digite seu nome abaixo para entrar.</p>
          <form onSubmit={this.joinRoom.bind(this)}>
            <div className="form-group">
              <label htmlFor="nome">Seu nome</label>
              <input id="nome" type="text" value={this.state.name} onChange={this.handleChange.bind(this)} className="form-control" autoFocus autoComplete="given-name"/>
            </div>
            <button type="submit" className="btn btn-light">Entrar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default JoinRoom;
