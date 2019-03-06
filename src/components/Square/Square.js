import React from "react";
import ReactDOM from "react-dom";

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.winner === this.props.value && this.props.winner != null) {
      return (
        <button className="square blue" onClick={this.props.onClick}>
          {this.props.value}
        </button>
      );
    } else {
      return (
        <button className="square" onClick={this.props.onClick}>
          {this.props.value}
        </button>
      );
    }
  }
}
export default Square;