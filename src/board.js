import React from "react";

import Square from "./square.js";

export default class Board extends React.Component {
    constructor() {
        super();

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = this.getStatusText();

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

    handleClick(i) {
        if (BoardHelper.calculateWinner(this.state.squares) || this.state.squares[i]) {
            return;
        }

        const squares = this.state.squares.slice();
        squares[i] = this.getNextPlayer();
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    getNextPlayer() {
        if (this.state.xIsNext) {
            return "X";
        }

        return "O";
    }

    getStatusText() {
        const winner = BoardHelper.calculateWinner(this.state.squares);

        if (winner) {
            return "Winner: " + winner;
        }

        return "Next player: " + this.getNextPlayer();
    }
}

class BoardHelper {
    static calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }
}