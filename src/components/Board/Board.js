import React from "react";
import ReactDOM from "react-dom";
import Square from "./../Square/Square";
import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBoard() {
    const arr = [1, 2, 3];
    const result = arr.map(i => {
      return this.renderRow(i - 1);
    });

    return result;
  }
  renderRow(j) {
    const arr = [1, 2, 3];
    const result = arr.map(i => {
      const ind = j * 3 + i;
      const position = `(${j + 1},${i})`;
      return this.renderSquare(ind - 1, position);
    });

    return <div className="board-row">{result}</div>;
  }

  renderSquare(i, position) {
    const square = { position: position, value: this.props.squares[i] };

    return (
      <Square
        position={position}
        winner={this.props.winner}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i, square)}
      />
    );
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}

export default Board;