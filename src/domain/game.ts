import { Board } from "./board";
import { Position } from "./position";
import { opponent } from "./square";


export abstract class Game
{
    protected readonly _board: Board;

    protected constructor(board: Board)
    {
        this._board = board;
    }

    public static create(width: number, height: number): Game
    {
        const board = Board.create(width, height);

        return new GameInProgress(board, 'white', []);
    }

    public get board(): Board
    {
        return this._board;
    }

    public abstract get currentPlayer(): 'white' | 'black';

    public abstract get winner(): 'white' | 'black' | 'tie';

    public abstract isValidMove(position: Position): boolean;

    public abstract putStone(position: Position): Game;

    public abstract get isGameOver(): boolean;

    public countStones(color: 'black' | 'white'): number
    {
        return this._board.countStones(color);
    }

    public abstract get recentlyCaptured(): Position[];

    public wasCaptured(position: Position): boolean
    {
        return this.recentlyCaptured.some(p => p.equals(position));
    }

    public get possibleMoves(): Position[]
    {
        const moves: Position[] = [];

        for ( const row of this._board.rowIndices )
        {
            for ( const column of this._board.columnIndices )
            {
                const position = new Position(row, column);

                if ( this.isValidMove(position) )
                {
                    moves.push(position);
                }
            }
        }

        return moves;
    }
}

class GameInProgress extends Game
{
    private _currentPlayer: 'white' | 'black';

    private _recentlyCaptured: Position[];

    constructor(board: Board, currentPlayer: 'white' | 'black', recentlyCaptured: Position[])
    {
        super(board);

        this._currentPlayer = currentPlayer;
        this._recentlyCaptured = recentlyCaptured;
    }

    public override get currentPlayer(): 'white' | 'black'
    {
        return this._currentPlayer;
    }

    public override get winner(): 'white' | 'black' | 'tie'
    {
        throw new Error("No winner yet, the game is still in progress.");
    }

    public override get isGameOver(): boolean
    {
        return false;
    }

    public override isValidMove(position: Position): boolean
    {
        return this._board.get(position) === 'empty' && !this.wasCaptured(position);
    }

    public override putStone(position: Position): Game
    {
        if ( !this.isValidMove(position) )
        {
            return this;
        }

        const newBoard = this._board.copy();
        newBoard.putStone(position, this._currentPlayer);
        const captured = newBoard.captureStonesAround(position);
        const nextPlayer = opponent(this._currentPlayer);

        if ( newBoard.fiveInARow(position) )
        {
            return new GameOver(newBoard, this._currentPlayer);
        }

        if ( newBoard.isFull )
        {
            return new GameOver(newBoard, 'tie');
        }

        return new GameInProgress(newBoard, nextPlayer, captured);
    }

    public override get recentlyCaptured(): Position[]
    {
        return this._recentlyCaptured;
    }
}

class GameOver extends Game
{
    private _winner: 'white' | 'black' | 'tie';

    constructor(board: Board, winner: 'white' | 'black' | 'tie')
    {
        super(board);

        this._winner = winner;
    }

    public override get currentPlayer(): 'white' | 'black'
    {
        throw new Error("Cannot put stone in a finished game.");
    }

    public override get winner(): 'white' | 'black' | 'tie'
    {
        return this._winner;
    }

    public override putStone(): Game
    {
        throw new Error("Cannot put stone in a finished game.");
    }

    public override get isGameOver(): boolean
    {
        return true;
    }

    public override get recentlyCaptured(): Position[]
    {
        return [];
    }

    public override isValidMove(): boolean
    {
        return false;
    }
}