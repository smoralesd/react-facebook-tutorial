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
            xIsNext: true
        };
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = BoardHelper.calculateWinner(current.squares);

        let status = this.getStatusText(winner);

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
                    <ol>{/* TODO */}</ol>
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
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (BoardHelper.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.getNextPlayer();

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext
        });
    }
}