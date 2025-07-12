import { Grid } from "./grid";
import { Position } from "./position";
import { opponent, type Square } from "./square";


export class Board
{
    public readonly grid: Grid<Square>;

    private constructor(grid: Grid<Square>)
    {
        this.grid = grid;
    }

    public copy(): Board
    {
        return new Board(this.grid.copy());
    }

    public get(position: Position): Square
    {
        return this.grid.at(position);
    }

    public putStone(position: Position, stone: 'white' | 'black')
    {
        this.grid.set(position, stone);
    }

    private captureStonesInDirection(position: Position, direction: { dx: number; dy: number }): void
    {
        const p3 = new Position(
            position.x + 3 * direction.dx,
            position.y + 3 * direction.dy
        );

        if ( !this.isInside(p3) )
        {
            return;
        }

        const owner = this.get(p3);

        if ( owner === 'empty' )
        {
            return;
        }

        const p1 = new Position(
            position.x + direction.dx,
            position.y + direction.dy
        );
        const p2 = new Position(
            position.x + 2 * direction.dx,
            position.y + 2 * direction.dy
        );

        const otherPlayer = opponent(owner);

        if ( this.get(p1) === otherPlayer && this.get(p2) === otherPlayer )
        {
            this.grid.set(p1, 'empty');
            this.grid.set(p2, 'empty');
        }
    }

    public captureStonesAround(position: Position): void
    {
        for ( const direction of this.directionVectors)
        {
            this.captureStonesInDirection(position, direction);
        }
    }

    public get directionVectors(): { dx: number; dy: number }[]
    {
        return [
            { dx: -1, dy: -1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: -1 },
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: -1, dy: 1 },
            { dx: 0, dy: 1 },
            { dx: 1, dy: 1 }
        ];
    }

    public get width(): number
    {
        return this.grid.width;
    }

    public get height(): number
    {
        return this.grid.height;
    }

    public isInside(position: Position): boolean
    {
        return this.grid.isInside(position);
    }

    public static create(rows: number, columns: number): Board
    {
        return new Board(Grid.create<Square>(columns, rows, 'empty'));
    }

    public countStones(color: 'black' | 'white'): number
    {
        return this.grid.count(value => value === color);
    }

    public get rowIndices(): number[]
    {
        return this.grid.rowIndices;
    }

    public get columnIndices(): number[]
    {
        return this.grid.columnIndices;
    }
}
