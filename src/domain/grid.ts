import { range } from "@/util";
import type { Position } from "./position";

export class Grid<T>
{
    private readonly grid: T[][];

    private constructor(grid: T[][])
    {
        this.grid = grid;
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

        return new Grid(newGrid);
    }

    public isInside(position: Position): boolean
    {
        return 0 <= position.x && position.x < this.width && 0 <= position.y && position.y < this.height;
    }

    public static create<T>(width: number, height: number, initialValue: T): Grid<T>
    {
        const grid = Array.from({ length: height }, () => Array(width).fill(initialValue));
        return new Grid(grid);
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
        return range(0, this.height);
    }

    public get columnIndices(): number[]
    {
        return range(0, this.width);
    }
}