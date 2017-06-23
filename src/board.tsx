import * as React from "react";

import Square from "./square.js";

export default class Board extends React.Component<any, any> {

    renderSquare(i) {
        let shouldHighlight = null;

        if (this.props.highlight) {
            shouldHighlight = this.props.highlight.find(x => { return x === i; });
        }

        return (
            <Square
                value={this.props.squares[i]}
                highlight={shouldHighlight != null}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
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
 }
