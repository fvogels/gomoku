import type { Square } from "@/domain/square";
import classes from "./BoardView.module.css";
import SquareView from "./SquareView";
import { Position } from "@/domain/position";
import React from "react";
import type { Board } from "@/domain/board";


interface Props
{
    board: Board;
    onClickSquare?: (position: Position) => void;
}

export default function BoardView(props: Props): React.ReactNode
{
    return (
        <div className={classes.board}>
            {props.board.rowIndices.map(rowIndex => renderRow(rowIndex))}
        </div>
    );


    function renderRow(rowIndex: number): React.ReactNode
    {
        return (
            <div key={rowIndex} className={classes.row}>
                {props.board.columnIndices.map(colIndex => (
                    <React.Fragment key={colIndex}>
                        {renderSquare(rowIndex, colIndex)}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    function renderSquare(rowIndex: number, colIndex: number): React.ReactNode
    {
        const position = new Position(colIndex, rowIndex);
        const square = props.board.get(position);

        return (
            <SquareView contents={square} onClick={() => props.onClickSquare?.(position)} />
        );
    }
}