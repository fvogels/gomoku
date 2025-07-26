import type React from 'react';
import { useState } from 'react';
import BoardView from './components/BoardView';
import { Game } from './domain/game';
import type { Position } from './domain/position';
import './App.css'
import Center from './components/Center';
import SpreadHorizontally from './components/SpreadHorizontally';
import StoneCount from './components/StoneCount';
import classes from './App.module.css';
import { bestMove } from './domain/ai-adapter';

function App(): React.ReactNode
{
    const [game, setGame] = useState(Game.create(19, 19));

    return (
        <>
            <Center>
                <SpreadHorizontally>
                    <StoneCount color="white" count={game.countStones('white')} />
                    {renderStatus()}
                    <StoneCount color="black" count={game.countStones('black')} />
                </SpreadHorizontally>
                <BoardView game={game} onClickSquare={onClickSquare} />
            </Center>
        </>
    );


    function onClickSquare(position: Position): void
    {
        if ( !game.isGameOver && game.currentPlayer === 'white' && game.isValidMove(position) )
        {
            const updatedGame = game.putStone(position)

            if ( !updatedGame.isGameOver )
            {
                const bm = bestMove(updatedGame, 2)
                setGame(updatedGame.putStone(bm));
            }
            else
            {
                setGame(updatedGame);
            }
        }
    }

    function renderStatus(): React.ReactNode
    {
        if ( game.isGameOver )
        {
            switch ( game.winner )
            {
                case 'white':
                    return <span className={classes.outcome}>White wins!</span>;
                case 'black':
                    return <span className={classes.outcome}>Black wins!</span>;
                case 'tie':
                    return <span className={classes.outcome}>It's a tie!</span>;
                default:
                    return null;
            }
        }
        else
        {
            if ( game.currentPlayer === 'white' )
            {
                return <span className={classes.currentPlayer}>White's turn</span>;
            }
            else
            {
                return <span className={classes.currentPlayer}>Black's turn</span>;
            }
        }
    }
}

export default App;
