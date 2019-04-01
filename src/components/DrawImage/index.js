import io from 'socket.io-client';
import React, { Component } from 'react';
import { LiterallyCanvasReactComponent, tools } from 'literallycanvas';

import './style.css';

class DrawImage extends Component {
  onCanvasInit(lc) {
    const socket = io.connect('http://localhost:8080');

    const loadSnapshot = ({ draw }) => lc.loadSnapshot(draw);

    socket.on('connection', loadSnapshot);
    socket.on('draw', loadSnapshot);
  }

  render() {
    return (
      <div className="DrawImage">
        <LiterallyCanvasReactComponent onInit={this.onCanvasInit} imageURLPrefix="/img" tools={[tools.Pan]} />
      </div>
    )
  }
}

export default DrawImage;