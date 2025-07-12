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

    public get(position: Position): Square
    {
        return this.grid.at(position);
    }

    public putStone(position: Position, stone: 'white' | 'black'): Board
    {
        const grid = this.grid.copy();
        grid.set(position, stone);

        for ( const dx of [-1, 0, 1] )
        {
            for ( const dy of [-1, 0, 1] )
            {
                if ( dx !== 0 || dy !== 0 )
                {
                    const x = position.x + 3 * dx;
                    const y = position.y + 3 * dy;
                    const p3 = new Position(x, y);

                    if ( this.isInside(p3) && this.get(p3) === stone )
                    {
                        const p1 = new Position(position.x + dx, position.y + dy);
                        const p2 = new Position(position.x + 2 * dx, position.y + 2 * dy);
                        const otherPlayer = opponent(stone);

                        if ( this.get(p1) === otherPlayer && this.get(p2) === otherPlayer )
                        {
                            grid.set(p1, 'empty');
                            grid.set(p2, 'empty');
                        }
                    }
                }
            }
        }

        return new Board(grid);
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
