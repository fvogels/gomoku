export class Position
{
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    public equals(other: Position): boolean
    {
        return this.x === other.x && this.y === other.y;
    }

    public move(dx: number, dy: number): Position
    {
        return new Position(this.x + dx, this.y + dy);
    }

    public toString(): string
    {
        return `(${this.x}, ${this.y})`;
    }
}
