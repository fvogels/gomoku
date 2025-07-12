import SquareView from "./SquareView";

interface Props
{
    color: 'black' | 'white';
    count: number;
}

export default function StoneCount(props: Props): React.ReactElement
{
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '10px' }}>
            <SquareView contents={props.color} />
            <span>{props.count}</span>
        </div>
    );
}