import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Game.css";
import Board from "./../Board/Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: ""
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      player1: "Player 1",
      player2: "Player 2"
    };
  }
  onChangePlayer1 = event => {
    this.setState({ player1: event.target.value });
  };
  onChangePlayer2 = event => {
    this.setState({ player2: event.target.value });
  };

  handleClick(i, square) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: square.position
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      player1: this.state.player1,
      player2: this.state.player2
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  checkIfNull(squares) {
    if (squares === null) {
      return;
    }
  }
  handleMovesOrder(moves) {
    if (moves.length > 1) {
      moves.reverse();
    }
  }

  render() {
    let status;
    const history = this.state.history;

    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move
        ? "Go to move #" + move + ` ${step.position} `
        : "Go to game start";
      status = "";

      return (
        <li className="buttonList" key={move}>
          <button className="movePos" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    if (winner) {
      if (winner == "X") {
        status = <div className="winner">You won {this.state.player1}</div>;
      } else {
        status = <div className="winner">You won {this.state.player2}</div>;
      }
    } else if (!winner && this.state.history.length === 10) {
      status = <div className="winner">You have a draw</div>;
    } else {
      status =
        "Next player: " +
        (this.state.xIsNext ? this.state.player1 : this.state.player2);
    }

    return (
      <React.Fragment>
        <div className="flexed">
          <span className="">Player 1</span>
          <input
            onChange={e => this.onChangePlayer1(e)}
            type="text"
            className="player"
          />
          <span className="">Player 2</span>
          <input
            onChange={e => this.onChangePlayer2(e)}
            type="text"
            className="player"
          />
        </div>
        <div className="info">{status}</div>
        <div className="game">
          <div className="game-board">
            <div className="game-info" />
            <Board
              winner={winner}
              squares={current.squares}
              onClick={(i, square) => this.handleClick(i, square)}
            />
            <button onClick={() => this.handleMovesOrder(moves)}>Toogle</button>
            <ol>{moves}</ol>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Game;