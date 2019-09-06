import React, { Component } from "react";
import "./WaterWave.css";

class WaterWave extends Component {
  // GET MAX & MIN X
  getMinX() {
    const { points } = this.props;
    return points[0].t;
  }
  getMaxX() {
    const { points } = this.props;
    return points[points.length - 1].t;
  }
  // GET MAX & MIN Y
  getMinY() {
    const { points } = this.props;
    return points.reduce((min, p) => (p.y < min ? p.y : min), points[0].y);
  }
  getMaxY() {
    const { points } = this.props;
    return points.reduce((max, p) => (p.y > max ? p.y : max), points[0].y);
  }
  //getSvgX: We need to convert the largest X value to SVG coordinates. For now, we ignore negative values of x
  getSvgX(x) {
    const { svgWidth } = this.props;
    return (x / this.getMaxX()) * svgWidth;
  }
  //getSvgY; Our sine function returns positive as well as negative values. SVG values can only be positive
  //from the upper left corner.
  getSvgY(y) {
    const { svgHeight } = this.props;

    return (
      svgHeight * 0.5 -
      (y / (this.getMaxY() - this.getMinY())) * svgHeight * 0.5
    );
  }

  makePath() {
    const { points, color } = this.props;

    let pathD =
      "M" + this.getSvgX(points[0].t) + " " + this.getSvgY(points[0].y) + " ";

    pathD += points.map((point, i) => {
      return "L" + this.getSvgX(point.t) + " " + this.getSvgY(point.y) + " ";
    });

    return <path className="wave" d={pathD} style={{ stroke: color }} />;
  }

  render() {
    const { svgHeight, svgWidth } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        {this.makePath()}
      </svg>
    );
  }
}

WaterWave.defaultProps = {
  points: [],
  color: "#2196F3",
  svgHeight: 300,
  svgWidth: 700
};

export default WaterWave;
