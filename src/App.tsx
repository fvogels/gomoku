import type React from 'react';
import { useState } from 'react';
import BoardView from './components/BoardView';
import { Game } from './domain/game';
import type { Position } from './domain/position';
import './App.css'
import Center from './components/Center';
import SpreadHorizontally from './components/SpreadHorizontally';
import StoneCount from './components/StoneCount';


function App(): React.ReactNode
{
    const [game, setGame] = useState(Game.create(19, 19));

    return (
        <>
            <Center>
                <SpreadHorizontally>
                    <StoneCount color="white" count={game.countStones('white')} />
                    {renderOutcome()}
                    <StoneCount color="black" count={game.countStones('black')} />
                </SpreadHorizontally>
                <BoardView board={game.board} onClickSquare={onClickSquare} />
            </Center>
        </>
    );


    function onClickSquare(position: Position): void
    {
        if ( !game.isGameOver )
        {
            setGame(prevGame => prevGame.putStone(position));
        }
    }

    function renderOutcome(): React.ReactNode
    {
        if ( game.isGameOver )
        {
            switch ( game.winner )
            {
                case 'white':
                    return <span className="outcome">White wins!</span>;
                case 'black':
                    return <span className="outcome">Black wins!</span>;
                case 'tie':
                    return <span className="outcome">It's a tie!</span>;
                default:
                    return null;
            }
        }
        else
        {
            return <></>;
        }
    }
}

export default App;
