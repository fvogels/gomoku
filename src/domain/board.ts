import { Position } from "./position";
import { opponent, type Square } from "./square";

export class Board
{
    public readonly grid: Square[][];

    private constructor(grid: Square[][])
    {
        this.grid = grid;
    }

    public get(position: Position): Square
    {
        return this.grid[position.y][position.x];
    }

    public putStone(position: Position, stone: 'white' | 'black'): Board
    {
        const grid = this.copyGrid();
        grid[position.y][position.x] = stone;

        for ( const dx of [-1, 0, 1] )
        {
            for ( const dy of [-1, 0, 1] )
            {
                if ( dx !== 0 || dy !== 0 )
                {
                    const x = position.x + 3 * dx;
                    const y = position.y + 3 * dy;
                    const p3 = new Position(x, y);

                    if ( this.isInsideBoard(p3) && this.get(p3) === stone )
                    {
                        const p1 = new Position(position.x + dx, position.y + dy);
                        const p2 = new Position(position.x + 2 * dx, position.y + 2 * dy);
                        const otherPlayer = opponent(stone);

                        if ( this.get(p1) === otherPlayer && this.get(p2) === otherPlayer )
                        {
                            grid[p1.y][p1.x] = 'empty';
                            grid[p2.y][p2.x] = 'empty';
                        }
                    }
                }
            }
        }

        return new Board(grid);
    }

    public get width(): number
    {
        return this.grid[0].length;
    }

    public get height(): number
    {
        return this.grid.length;
    }

    public isInsideBoard(position: Position): boolean
    {
        return 0 <= position.x && position.x < this.width &&
               0 <= position.y && position.y < this.height;
    }

    private copyGrid(): Square[][]
    {
        return this.grid.map(row => [...row]);
    }

    public static create(rows: number, columns: number): Board
    {
        const grid: Square[][] = [];

        for (let row = 0; row < rows; row++)
        {
            const gridRow: Square[] = [];
            for (let column = 0; column < columns; column++)
            {
                gridRow.push('empty');
            }
            grid.push(gridRow);
        }

        return new Board(grid);
    }

    public countStones(color: 'black' | 'white'): number
    {
        return this.grid.flat().filter(square => square === color).length;
    }
}
