export interface GameState<T>
{
    possibleMoves: T[];
    makeMove(move: T): GameState<T>;
    score: number;
}

export function computeBestMove<T>(state: GameState<T>, depth: number): T
{
    const moves = state.possibleMoves;
    let bestMove = state.possibleMoves[0];
    let bestScore = scoreTheirTurn(state.makeMove(state.possibleMoves[0]), depth, -Infinity);

    console.log(`${JSON.stringify(state.possibleMoves[0])}: ${bestScore}`);

    for ( let i = 1; i < moves.length; i++ )
    {
        const move = moves[i];
        const newState = state.makeMove(move);
        const score = scoreTheirTurn(newState, depth, bestScore);

        console.log(`${JSON.stringify(move)}: ${score}`);

        if ( score > bestScore )
        {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;


    function scoreOurTurn(state: GameState<T>, depth: number, cutOff: number): number
    {
        if ( depth === 0 )
        {
            return state.score;
        }

        const possibleMoves = state.possibleMoves;
        let bestScore = -Infinity;

        for ( const move of possibleMoves )
        {
            const newState = state.makeMove(move);
            const score = scoreTheirTurn(newState, depth - 1, bestScore);

            if ( score > bestScore )
            {
                bestScore = score;

                if ( bestScore >= cutOff )
                {
                    return bestScore;
                }
            }
        }

        return bestScore;
    }

    function scoreTheirTurn(state: GameState<T>, depth: number, cutOff: number): number
    {
        if ( depth === 0 )
        {
            return state.score;
        }

        const possibleMoves = state.possibleMoves;
        let worstScore = Infinity;

        for ( const move of possibleMoves )
        {
            const newState = state.makeMove(move);
            const score = scoreOurTurn(newState, depth - 1, worstScore);

            if ( score < worstScore )
            {
                worstScore = score;

                if ( worstScore <= cutOff )
                {
                    return worstScore;
                }
            }
        }

        return worstScore;
    }
}