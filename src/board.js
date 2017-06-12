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
        const status = "Next player: " + this.getNextPlayer();

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
}