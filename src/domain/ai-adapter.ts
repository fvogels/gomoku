import { computeBestMove, type GameState } from '@/ai';
import { Position } from './position';
import type { Game } from './game';
import { opponent } from './square';


class GomokuGameState implements GameState<Position> {
    private readonly game: Game;
    private readonly player: 'white' | 'black';

    constructor(game: Game, player: 'white' | 'black') {
        this.game = game;
        this.player = player;
    }

    get possibleMoves(): Position[]
    {
        const game = this.game;
        return game.possibleMoves.filter(hasNeighbor);


        function hasNeighbor(position: Position): boolean
        {
            return game.board.neighbors(position).some(neighbor => game.board.get(neighbor) !== 'empty');
        }
    }

    makeMove( move: Position ): GameState<Position>
    {
        const updatedGame = this.game.putStone(move);

        return new GomokuGameState(updatedGame, this.player)
    }

    get score(): number
    {
        const game = this.game;
        const player = this.player;
        const otherPlayer = opponent(this.player);
        let playerLongest = 0;
        let otherLongest = 0;

        for ( const sequence of game.board.sequences() )
        {
            scan(sequence);

            if ( playerLongest >= 4 )
            {
                return Infinity;
            }
            if ( otherLongest >= 4 )
            {
                return -Infinity;
            }
        }

        return game.board.countStones(player) - game.board.countStones(otherPlayer);


        function scan(positions: Position[]): void
        {
            const groups: { contents: 'white' | 'black' | 'empty'; count: number }[] = [];
            let index = 0;

            while ( index < positions.length )
            {
                const color = game.board.get(positions[index]);
                let count = 1;
                index++;

                while ( index < positions.length && game.board.get(positions[index]) === color )
                {
                    count++;
                    index++;
                }

                groups.push({ contents: color, count });
            }

            playerLongest = Math.max(playerLongest, findLongest(player));
            otherLongest = Math.max(otherLongest, findLongest(otherPlayer));


            function findLongest(p: 'white' | 'black'): number
            {
                let result = 0;

                for ( let i = 0; i < groups.length; i++ )
                {
                    if ( groups[i].contents === p && groups[i].count >= 3 )
                    {
                        let surroundingEmpty = 0;

                        if ( i > 0 && groups[i-1].contents === 'empty' )
                        {
                            surroundingEmpty += groups[i-1].count;
                        }

                        if ( i + 1 < groups.length && groups[i+1].contents === 'empty' )
                        {
                            surroundingEmpty += groups[i+1].count;
                        }

                        if ( groups[i].count + surroundingEmpty >= 5 )
                        {
                            result = Math.max(result, groups[i].count);
                        }
                    }
                }

                return result;
            }
        }
    }
}

export function bestMove(game: Game, depth: number): Position
{
    const state = new GomokuGameState(game, game.currentPlayer);
    return computeBestMove(state, depth);
}