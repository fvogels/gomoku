import { Board } from "./board";
import type { Position } from "./position";
import { opponent } from "./square";


export class Game
{
    private readonly _board: Board;
    private _currentPlayer: 'white' | 'black';

    public static create(width: number, height: number): Game
    {
        const board = Board.create(width, height);
        return new Game(board, 'white');
    }

    private constructor(board: Board, currentPlayer: 'white' | 'black')
    {
        this._board = board;
        this._currentPlayer = currentPlayer;
    }

    public get board(): Board
    {
        return this._board;
    }

    public get currentPlayer(): 'white' | 'black'
    {
        return this._currentPlayer;
    }

    public putStone(position: Position): Game
    {
        if (this._board.get(position) !== 'empty') {
            return this;
        }

        const newBoard = this._board.putStone(position, this._currentPlayer);
        const nextPlayer = opponent(this._currentPlayer);
        return new Game(newBoard, nextPlayer);
    }

    public countStones(color: 'black' | 'white'): number
    {
        return this._board.countStones(color);
    }
}