import {FC, ReactNode, useState} from "react";
import Head from "next/head";
import {Header} from "../../Components/Header/Header";
import style from "./MainLayout.module.scss"
import {BurgerMenu} from "../../Components/BurgerMenu/BurgerMenu";

interface IMainLayout {
    children: ReactNode
    headTitle?: string
}

export const MainLayout: FC<IMainLayout> = ({
                                                children,
                                                headTitle = 'Rick and Morty',
}) => {
    return (
        <div className={style.mainLayout}>
            <Head>
                {/*<meta name="keywords" content="next,js,nextjs,react"/>*/}
                {/*<meta name="description" content="this is demo site"/>*/}
                <meta charSet="utf-8"/>
                <title>
                    {headTitle}
                </title>
            </Head>

            <Header/>

            <BurgerMenu/>

            <main  className={style.main}>
                {children}
            </main>
        </div>
    )
}