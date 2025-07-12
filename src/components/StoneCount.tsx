import StoneView from "./StoneView";

interface Props
{
    color: 'black' | 'white';
    count: number;
}

export default function StoneCount(props: Props): React.ReactElement
{
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '10px' }}>
            <div style={{ width: '64px', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <StoneView color={props.color} />
            </div>
            <span>{props.count}</span>
        </div>
    );
}