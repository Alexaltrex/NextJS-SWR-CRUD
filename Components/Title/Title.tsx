import style from "./Title.module.scss"
import {FC} from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MapIcon from '@mui/icons-material/Map';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

interface ITitleBlock {
    title: string
}

const icons = {
    "characters": <AccountBoxIcon className={style.icon}/>,
    "locations": <MapIcon className={style.icon}/>,
    "episodes": <LocalMoviesIcon className={style.icon}/>,
    "characters list": <FormatListBulletedIcon className={style.icon}/>,
    "products": <ShoppingBagIcon className={style.icon}/>,
}

export const TitleBlock:FC<ITitleBlock> = ({title}) => {
    return (
        <div className={style.titleBlock}>
            {/*@ts-ignore*/}
            {icons.hasOwnProperty(title) && icons[title as string]}
            <h1 className={style.title}>{title}</h1>
        </div>
    )
}