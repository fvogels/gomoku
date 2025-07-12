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
                    <StoneCount color="black" count={game.countStones('black')} />
                    <StoneCount color="white" count={game.countStones('white')} />
                </SpreadHorizontally>
                <BoardView board={game.board} onClickSquare={onClickSquare} />
            </Center>
        </>
    );


    function onClickSquare(position: Position): void
    {
        setGame(prevGame => prevGame.putStone(position));
    }
}

export default App;
