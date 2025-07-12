import type { Square } from '@/domain/square';
import classes from './SquareView.module.css';
import StoneView from './StoneView';


interface Props
{
    contents: Square;
    onClick?: () => void;
}

export default function SquareView(props: Props): React.ReactNode
{
    return (
        <div className={classes.squareView} onClick={onClick}>
            {renderStone()}
        </div>
    );


    function renderStone(): React.ReactNode
    {
        switch (props.contents) {
            case "empty":
                return null;
            default:
                return <StoneView color={props.contents} />;
        }
    }

    function onClick(): void
    {
        props.onClick?.();
    }
}
