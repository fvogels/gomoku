import type { Square } from '@/domain/square';
import classes from './SquareView.module.css';


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
            case "black":
                return <div className={`${classes.stone} ${classes.black}`} />;
            case "white":
                return <div className={`${classes.stone} ${classes.white}`} />;
        }
    }

    function onClick(): void
    {
        props.onClick?.();
    }
}
