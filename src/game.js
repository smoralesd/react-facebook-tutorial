import React from "react";

import Board from "./board.js";
import BoardHelper from "./board-helper.js";

export default class Game extends React.Component {
    constructor() {
        super();

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = BoardHelper.calculateWinner(current.squares);

        let status = this.getStatusText(winner);
        let moves = this.getMovesHistory(history);

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    getStatusText(winner) {
        if (winner) {
            return "Winner: " + winner;
        }

        return "Next player: " + this.getNextPlayer();
    }

    getNextPlayer() {
        if (this.state.xIsNext) {
            return "X";
        }

        return "O";
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (BoardHelper.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.getNextPlayer();

        this.setState({
            history: history.concat([{
                squares: squares,
                column: i % 3 + 1,
                row: parseInt(i / 3, 10) + 1
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    getMovesHistory(history) {
        return history.map((step, move) => {
            const desc = move ?
                "Move (" + step.row + "," + step.column + ")":
                "Game start";

            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        });
    }
}