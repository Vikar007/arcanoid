import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import Racket from '../Racket/index.js';
import Ball from '../Ball/index.js';

class Arc extends React.Component {
  constructor(props) {
    super(props)

    this.timer = null;
    this.rect = null;

    this.state = {
      racket_x: 40,
      ball_x: 260,
      ball_y: 640,
      step_x: 4,
      step_y: -4,
      start_stop: false
    }

    this.onStop = this.onStop.bind(this);
    this.onStart = this.onStart.bind(this);
  }

  componentDidMount() {
    const element = document.getElementById('main_div');
    this.rect = element.getBoundingClientRect()
    console.log(this.rect);
  }

  onBallMove() {

    let step = 4;
    const { ball_x, ball_y, step_x, step_y, racket_x } = this.state;

    if (ball_x >= 472) { this.setState({ step_x: -step }) };
    if (ball_x <= 5) { this.setState({ step_x: step }) };
    this.setState({ ball_x: ball_x + step_x })

    const reflected = (ball_y >= 630 && ball_x >= racket_x && ball_x <= racket_x + 100);

    if (reflected) { this.setState({ step_y: -step }) }

    //Если не смогли отразить шарик, то...
    if (ball_y > 660 && !reflected) {
      clearInterval(this.timer);
      this.setState({ start_stop: false })
    };
    if (ball_y <= 5) { this.setState({ step_y: step }) };
    this.setState({ ball_y: ball_y + step_y })
  }

  onMouseMove = e => {
    const mouse_x = e.pageX;
    const { rect } = this;
    if ((mouse_x > rect.left + 50) && (mouse_x < rect.left + 450)) {
      this.setState({ racket_x: mouse_x - rect.left - 50 });
    }
  }


  onKeyDown = e => {
    const step = 20;
    const { racket_x } = this.state;
    if (e.keyCode === 37 && racket_x >= step) {
      this.setState({ racket_x: racket_x - step })
    }
    if (e.keyCode === 39 && racket_x <= 400 - step) {
      this.setState({ racket_x: racket_x + step })
      clearInterval(this.timer);
    }
    // console.log(racket_x);
  }



  onStart() {
    if (!this.state.start_stop) {
      this.setState({
        racket_x: 40,
        ball_x: 260,
        ball_y: 640,
        step_x: -4,
        step_y: -4,
        start_stop: true
      })

      this.timer = setInterval(
        () => {
          this.onBallMove();
        },
        20
      );
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onStop() {
    clearInterval(this.timer);
    this.setState({ start_stop: false })
  }

  render() {
    const { racket_x } = this.state;
    const { ball_x, ball_y } = this.state;
    // console.log('Значение rect - ', this.rect);
    return (
      <div className='Warp'>
        <div id='main_div' className="Box" onKeyDown={this.onKeyDown} tabIndex="0" onMouseMove={this.onMouseMove} >

          <div className={'Brix'} style={{ left: 0 }}></div>
          <div className={'Brix'} style={{ left: 100 }}></div>
          <div className={'Brix'} style={{ left: 200 }}></div>
          <div className={'Brix'} style={{ left: 300 }}></div>
          <div className={'Brix'} style={{ left: 400 }}></div>
          <Ball val_x={ball_x} val_y={ball_y} />
          <Racket value={racket_x} />
        </div>
        <div>
          <button className='Btn' style={{ left: 160 }} onClick={this.onStart}>Старт</button>
          <button className='Btn' style={{ left: 260 }} onClick={this.onStop}>Стоп</button>
        </div>
      </div >
    );
  }
}

export default Arc;
