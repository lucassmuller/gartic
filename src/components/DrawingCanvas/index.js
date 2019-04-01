import io from 'socket.io-client';
import React, { Component } from 'react';
import { LiterallyCanvasReactComponent, defaultTools, tools } from 'literallycanvas';

class DrawingCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      tools: undefined
    };
  }
  
  componentDidMount() {
    this.socket = io.connect('http://localhost:8080');

    this.socket.on('connect', () => this.setState(() => ({ connected: true })))

    // const handleDraw = ({ canDraw }) => {
    //   this.setState(() => ({ 
    //     connected: true, 
    //     tools: canDraw ? defaultTools : [tools.Pan]
    //   }));

    //   this.socket.off('draw', handleDraw);
    // };

    // this.socket.on('draw', handleDraw);
  }

  onCanvasInit(lc) {
    let unregisterDrawWatcher = () => {};
    const registerDrawWatcher = () => {
      unregisterDrawWatcher = lc.on('drawingChange', () => {
        this.socket.emit('draw', { drawUpdate: lc.getSnapshot(['shapes']) });
      });
    };

    registerDrawWatcher();

    this.socket.on('draw', ({ draw }) => {
      unregisterDrawWatcher();
      lc.loadSnapshot(draw);
      registerDrawWatcher();
    });
  }

  render() {
    return (
      <div className="DrawingCanvas">
        {this.state.connected && 
          <LiterallyCanvasReactComponent onInit={this.onCanvasInit.bind(this)} imageURLPrefix="/img" tools={this.state.tools} />
        }
      </div>
    )
  }
}

export default DrawingCanvas;