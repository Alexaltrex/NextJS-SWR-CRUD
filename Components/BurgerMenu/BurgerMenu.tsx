import style from "./BurgerMenu.module.scss"
import clsx from "clsx";
import Link from "next/link";
import {links} from "../Header/Header";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";
import {useStore} from "../../hooks/useStore";

export const BurgerMenu = observer(() => {
    const router = useRouter();
    const {showBurgerMenu, setShowBurgerMenu} = useStore();

    return (
        <div className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_show]: showBurgerMenu
        })}>
            <div className={style.links}>
                {
                    links.map(({label, href}, index) => (
                        <Link key={index}
                              href={href}
                        >
                            <a className={clsx({
                                [style.link]: true,
                                [style.link_active]: router.pathname === href,
                            })}
                               onClick={() => {
                                   setShowBurgerMenu(false)
                               }}
                            >
                                {label}
                            </a>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
})