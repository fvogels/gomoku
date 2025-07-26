import { range } from "@/util";
import { Position } from "./position";

export class Grid<T>
{
    private readonly grid: T[][];
    private readonly rowRange: number[];
    private readonly columnRange: number[];

    private constructor(grid: T[][], rowRange: number[], columnRange: number[])
    {
        this.grid = grid;
        this.rowRange = rowRange;
        this.columnRange = columnRange;
    }

    public at(position: Position): T
    {
        return this.grid[position.y][position.x];
    }

    public set(position: Position, value: T): void
    {
        this.grid[position.y][position.x] = value;
    }

    public get width(): number
    {
        return this.grid[0].length;
    }

    public get height(): number
    {
        return this.grid.length;
    }

    public copy(): Grid<T>
    {
        const newGrid = this.grid.map(row => [...row]);

        return new Grid(newGrid, this.rowRange, this.columnRange);
    }

    public isInside(position: Position): boolean
    {
        return 0 <= position.x && position.x < this.width && 0 <= position.y && position.y < this.height;
    }

    public static create<T>(width: number, height: number, initialValue: T): Grid<T>
    {
        const grid = Array.from({ length: height }, () => Array(width).fill(initialValue));
        const rowRange = range(0, height);
        const columnRange = range(0, width);
        return new Grid(grid, rowRange, columnRange);
    }

    public count(predicate: (value: T) => boolean): number
    {
        let count = 0;

        for ( const row of this.grid )
        {
            for ( const value of row )
            {
                if ( predicate(value) )
                {
                    count++;
                }
            }
        }

        return count;
    }

    public get rowIndices(): number[]
    {
        return this.rowRange;
    }

    public get columnIndices(): number[]
    {
        return this.columnRange;
    }

    public subsequence(start: Position, dx: number, dy: number): Position[]
    {
        const positions: Position[] = [];
        let current = start;

        while ( this.isInside(current) )
        {
            positions.push(current);
            current = current.move(dx, dy);
        }

        return positions;
    }

    public rowPositions(row: number): Position[]
    {
        return this.subsequence(new Position(0, row), 1, 0);
    }

    public columnPositions(column: number): Position[]
    {
        return this.subsequence(new Position(column, 0), 0, 1);
    }

    public seDiagonalPositions(start: Position): Position[]
    {
        return this.subsequence(start, 1, -1);
    }

    public swDiagonalPositions(start: Position): Position[]
    {
        return this.subsequence(start, -1, -1);
    }

    public *sequences(): Iterable<Position[]>
    {
        yield *this.rowIndices.map(row => this.rowPositions(row));

        yield *this.columnIndices.map(column => this.columnPositions(column));

        yield *this.columnIndices.map(column => this.seDiagonalPositions(new Position(column, 0)));
        yield *this.rowIndices.map(row => this.seDiagonalPositions(new Position(0, row)));

        yield *this.columnIndices.map(column => this.swDiagonalPositions(new Position(column, 0)));
        yield *this.rowIndices.map(row => this.swDiagonalPositions(new Position(this.width - 1, row)));
    }

    public neighbors(position: Position): Position[]
    {
        const directions = [
            { dx: -1, dy: 0 },  // left
            { dx: 1, dy: 0 },   // right
            { dx: 0, dy: -1 },  // up
            { dx: 0, dy: 1 },   // down
            { dx: -1, dy: -1 }, // top-left
            { dx: 1, dy: -1 },  // top-right
            { dx: -1, dy: 1 },  // bottom-left
            { dx: 1, dy: 1 }    // bottom-right
        ];

        return directions.map(dir => position.move(dir.dx, dir.dy)).filter(pos => this.isInside(pos));
    }
}