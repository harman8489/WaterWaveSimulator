import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import WaterWave from "./WaterWave";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 0,
      viewBoxWidth: 200,
      viewBoxHeight: 100,
      sampling: 100
    };
  }

  createSinusoidal(phase, sampling) {
    const points = []; //The array containing the x,y pairs
    let t = 0; //The representation of the time (x)
    let increase = (Math.PI * 2) / sampling; //The timestep as a function of a whole cycle (360 deg)

    for (let i = 0; i <= sampling; i += 1) {
      //The phase is given in degrees, so it needs conversion into radians
      let y = Math.sin(t + phase * ((2 * Math.PI) / 360));

      for (let i = 0; i < 4; i++) {
        y += Math.sin(t * i + phase * ((2 * Math.PI) / 360));
      }

      t += increase;
      //Add the pair of coordinates
      points.push({ t, y });
    }
    return points;
  }

  tick() {
    this.setState(prevState => ({
      phase: this.state.phase + 3
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 0.0001);
  }

  render() {
    return (
      <div>
        <WaterWave
          points={this.createSinusoidal(this.state.phase, this.state.sampling)}
          svgHeight={this.state.viewBoxHeight}
          svgWidth={this.state.viewBoxWidth}
        />
        <WaterWave
          points={this.createSinusoidal(this.state.phase, this.state.sampling)}
          svgHeight={this.state.viewBoxHeight}
          svgWidth={this.state.viewBoxWidth}
        />
        <WaterWave
          points={this.createSinusoidal(this.state.phase, this.state.sampling)}
          svgHeight={this.state.viewBoxHeight}
          svgWidth={this.state.viewBoxWidth}
        />
        <WaterWave
          points={this.createSinusoidal(this.state.phase, this.state.sampling)}
          svgHeight={this.state.viewBoxHeight}
          svgWidth={this.state.viewBoxWidth}
        />
      </div>
    );
  }
}

export default App;
