import classes from './SquareView.module.css'


interface Props
{
    children: React.ReactNode;
}

export default function Center({ children }: Props): React.ReactNode
{
    return (
        <div className={classes.center}>
            {children}
        </div>
    );
}