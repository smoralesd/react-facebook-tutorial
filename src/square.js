import React from "react";

export default function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            { props.highlight ?
            <font color="red">{props.value}</font> :
            props.value }
        </button>
    );
}