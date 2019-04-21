import React, { Component } from 'react';
import { LiterallyCanvasReactComponent, tools } from 'literallycanvas';

class DrawingCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lc: undefined,
      tools: props.canDraw 
        ? [tools.Pencil, tools.Eraser, tools.Pan, tools.Eyedropper] : [tools.Pan]
    };
  }

  componentDidUpdate({ draw: oldDraw }) {
    this.loadDraw();
  }

  loadDraw() {
    if (this.state.lc)
      this.state.lc.loadSnapshot(this.props.draw);
  }

  onCanvasInit(lc) {
    this.setState({ lc });

    lc.on('clear', () => this.loadDraw());

    if (this.props.canDraw)
      lc.on('drawingChange', () => this.props.onDraw(
        lc.getSnapshot(['shapes'])
      ));
  }

  render() {
    return (
      <div className="DrawingCanvas">
        <LiterallyCanvasReactComponent onInit={this.onCanvasInit.bind(this)} imageURLPrefix="/img" tools={this.state.tools} />
      </div>
    );
  }
}

export default DrawingCanvas;