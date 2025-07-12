import type { Square } from "@/domain/square";
import classes from "./BoardView.module.css";
import SquareView from "./SquareView";
import { Position } from "@/domain/position";
import React from "react";


interface Props
{
    contents: Square[][];
    onClickSquare?: (position: Position) => void;
}

export default function BoardView(props: Props): React.ReactNode
{
    return (
        <div className={classes.board}>
            {props.contents.map((row, rowIndex) => renderRow(row, rowIndex))}
        </div>
    );


    function renderRow(row: Square[], rowIndex: number): React.ReactNode
    {
        return (
            <div key={rowIndex} className={classes.row}>
                {row.map((square, colIndex) => (
                    <React.Fragment key={colIndex}>
                        <SquareView contents={square} onClick={() => props.onClickSquare?.(new Position(colIndex, rowIndex))} />
                    </React.Fragment>
                ))}
            </div>
        );
    }
}