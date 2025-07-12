import classes from './SpreadHorizontally.module.css'


interface Props
{
    children: React.ReactNode;
}

export default function SpreadHorizontally({ children }: Props): React.ReactElement
{
    return (
        <div className={classes.spreadHorizontally}>
            {children}
        </div>
    );
}
