import style from "./LinearPreloader.module.scss";
import {LinearProgress} from "@mui/material";

export const LinearPreloader = () => {
    return (
        <LinearProgress color="error"
                        className={style.linearPreloader}
        />
    )
}