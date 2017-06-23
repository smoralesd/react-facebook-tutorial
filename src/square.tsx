import * as React from "react";

export default function Square(props) {
    const style = {
        backgroundColor: "#ffde00"
    };
    return (
        <button className="square" onClick={props.onClick}>
            { props.highlight ?
            <div style={style}>{props.value}</div> :
            props.value }
        </button>
    );
}