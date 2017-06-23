import * as React from "react";

import Board from "./board";
import BoardHelper from "./board-helper";

interface IHistoryEntry {
    squares: string[];
    row?: number;
    column?: number;
}

interface IGameState {
    history: IHistoryEntry[];
    xIsNext: boolean;
    stepNumber: number;
}

export class Game extends React.Component<any, IGameState> {
    constructor() {
        super();

        this.state = {
            history: [{
                squares: new Array<string>(9)
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
        let moves = this.getMovesHistory(history, this.state.stepNumber);

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        highlight={winner != null ? winner.line : null}
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
            return "Winner: " + winner.winner;
        }

        return "Next player: " + this.getNextPlayer();
    }

    getNextPlayer() {
        if (this.state.xIsNext) {
            return "X";
        }

        return "O";
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (BoardHelper.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.getNextPlayer();
        const newEntry: IHistoryEntry = {
            squares: squares,
            column: i % 3 + 1,
            row: Math.floor(i / 3) + 1
        };

        this.setState({
            history: history.concat([newEntry]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    getMovesHistory(history, currentStep) {
        return history.map((step, move) => {
            const desc = move ?
                "Move (" + step.row + "," + step.column + ")":
                "Game start";

            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{ move === currentStep ? <b>{desc}</b>: desc }</a>
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