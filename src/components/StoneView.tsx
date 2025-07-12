import classes from './StoneView.module.css';


interface Props
{
    color: 'black' | 'white';
}

export default function StoneView(props: Props): React.ReactNode
{
    switch ( props.color )
    {
        case "black":
            return <div className={`${classes.stone} ${classes.black}`} />;
        case "white":
            return <div className={`${classes.stone} ${classes.white}`} />;
    }
}
