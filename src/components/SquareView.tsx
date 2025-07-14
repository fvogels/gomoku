import type { Square } from '@/domain/square';
import classes from './SquareView.module.css';
import StoneView from './StoneView';


interface Props
{
    contents: Square;
    onClick?: () => void;
    captured: boolean;
}

export default function SquareView(props: Props): React.ReactNode
{
    const classNames = [classes.squareView];

    if ( props.captured ) {
        classNames.push(classes.captured);
    }

    return (
        <div className={classNames.join(' ')} onClick={onClick}>
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
