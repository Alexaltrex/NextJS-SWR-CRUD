import React, {FC} from "react";
import style from "./ErrorBlock.module.scss";
import {AxiosError} from "axios";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {Button} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import UndoIcon from '@mui/icons-material/Undo';
import CachedIcon from '@mui/icons-material/Cached';
import {useRouter} from "next/router";

interface IErrorBlock {
    error: AxiosError<any, any>
}

export const ErrorBlock:FC<IErrorBlock> = ({error}) => {
    const router = useRouter();

    return (
        <div className={style.errorBlock}>

            <div className={style.titleBlock}>
                <ErrorOutlineIcon className={style.icon}/>
                <h1>Error</h1>
            </div>

            <p className={style.message}>{error?.response?.data?.message ?? error.message}</p>

            <Button onClick={() => router.push("/")}
                    variant="contained"
                    color='inherit'
                    className={style.btn}
                    startIcon={<HomeIcon/>}
            >
                Go to the home page
            </Button>

            <Button onClick={() => router.back()}
                    variant="contained"
                    color='inherit'
                    className={style.btn}
                    startIcon={<UndoIcon/>}
            >
                Go to the previous page
            </Button>

            <Button onClick={() => window.location.reload()}
                    variant="contained"
                    color='inherit'
                    className={style.btn}
                    startIcon={<CachedIcon/>}
            >
                Reload page
            </Button>

        </div>
    )
}