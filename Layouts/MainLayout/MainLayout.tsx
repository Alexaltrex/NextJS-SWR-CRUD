import {FC, ReactNode, useCallback, useEffect, useState} from "react";
import Head from "next/head";
import {Header} from "../../Components/Header/Header";
import style from "./MainLayout.module.scss"
import {BurgerMenu} from "../../Components/BurgerMenu/BurgerMenu";
import {SnackbarCustom} from "../../Components/SnackbarCustom/SnackbarCustom";
import {useStore} from "../../hooks/useStore";
import {observer} from "mobx-react-lite";

interface IMainLayout {
    children: ReactNode
    headTitle?: string
}

export const MainLayout: FC<IMainLayout> = observer(({
                                                children,
                                                headTitle = 'Rick and Morty',
}) => {
    const {setShowHeader} = useStore();
    const [scrollTop, setScrollTop] = useState(0);

    const onScrollHandler = useCallback((e: any) => {
        const newScrollTop = window.scrollY;
        if (newScrollTop > scrollTop && newScrollTop > 60) {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
        setScrollTop(newScrollTop);
    }, [scrollTop]);

    useEffect(() => {
        window.addEventListener('scroll', onScrollHandler);
        return () => window.removeEventListener('scroll', onScrollHandler);
    }, [scrollTop]);

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

            <SnackbarCustom/>

            <main  className={style.main}>
                {children}
            </main>
        </div>
    )
})