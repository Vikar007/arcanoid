import React from 'react';
import './index.css';
import Racket from '../Racket/index.js';
import Ball from '../Ball/index.js';

class Arc extends React.Component {
  constructor(props) {
    super(props)



    this.state = {
      racket_x: 20,
      ball_x: 250,
      ball_y: 40,
      gor: 'left',
      ver: 'up'
    }

    // this.onKeyPress = this.onKeyPress.bind(this);
  }
  onMuve() {
    const { ball_x, ball_y, gor, ver } = this.state;
    const step_x = 10;
    const step_y = 10;

    if (ball_x <= 470 && gor === 'right') {
      this.setState({ ball_x: ball_x + step_x })
    }
    else { this.setState({ gor: 'left' }) };

    if (ball_x >= 10 && gor === 'left') {
      this.setState({ ball_x: ball_x - step_x })
    }
    else { this.setState({ gor: 'right' }) };

    console.log(gor);
    console.log(ball_x);


    if (ball_y <= 400 && ver === 'down') {
      this.setState({ ball_y: ball_y + step_y })
    }
    else { this.setState({ ver: 'up' }) };

    if (ball_y >= 10 && ver === 'up') {
      this.setState({ ball_y: ball_y - step_y })
    }
    else { this.setState({ ver: 'down' }) };

    console.log(gor);
    console.log(ball_x);
  }
  onKeyDown = e => {
    const step = 20;
    const { racket_x } = this.state;
    if (e.keyCode === 37 && racket_x >= step) {
      this.setState({ racket_x: racket_x - step })
    }
    if (e.keyCode === 39 && racket_x <= 400 - step) {
      this.setState({ racket_x: racket_x + step })
    }
    // console.log(racket_x);
  }

  componentDidMount() {

    this.timer = setInterval(
      () => this.onMuve(),
      50
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { racket_x } = this.state;
    const { ball_x, ball_y } = this.state;
    return (
      <div className="Box" onKeyDown={this.onKeyDown} tabIndex="0" >
        <Ball val_x={ball_x} val_y={ball_y} />
        <Racket value={racket_x} />

      </div>
      // <button onClick={this.onMuve()}>click</button>
    );
  }
}

export default Arc;
